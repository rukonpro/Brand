import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, items } = req.body;

        if (!userId || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'User ID and items are required' });
        }

        try {
            let totalOrderPrice = 0;
            let totalOrderPriceWithDiscount = 0;
            let totalOrderTax = 0;
            let totalDeliveryFee = 0;

            const orderItems = await Promise.all(
                items.map(async (item) => {
                    const product = await prisma.product.findUnique({
                        where: { id: item.productId },
                    });

                    if (!product) {
                        throw new Error(`Product with ID ${item.productId} not found`);
                    }

                    // Fetch delivery fee, default to 0 if not available
                    const deliveryFee = product.deliveryFee || 0;

                    // Calculate individual item pricing
                    const totalPrice = product.price * item.quantity;
                    const discountAmount = (totalPrice * (product.discountPercentage || 0)) / 100;
                    const totalPriceWithDiscount = totalPrice - discountAmount;
                    const totalTax = (totalPriceWithDiscount * (product.taxPercentage || 0)) / 100;

                    // Update the totals for the order
                    totalOrderPrice += totalPrice;
                    totalOrderPriceWithDiscount += totalPriceWithDiscount;
                    totalOrderTax += totalTax;
                    totalDeliveryFee += deliveryFee;

                    return {
                        productId: product.id,
                        quantity: item.quantity,
                        price: product.price,
                        totalPrice: totalPrice,
                        discountPercentage: product.discountPercentage || 0,
                        totalPriceWithDiscount: totalPriceWithDiscount,
                        taxPercentage: product.taxPercentage || 0,
                        totalTax: totalTax,
                        deliveryFee: deliveryFee,
                    };
                })
            );

            // Create the order with calculated totals
            const order = await prisma.order.create({
                data: {
                    userId: userId,
                    status: 'PENDING',
                    paymentStatus: 'PENDING',
                    totalTax: totalOrderTax,
                    totalPriceWithDiscount: totalOrderPriceWithDiscount + totalDeliveryFee,
                    totalPrice: totalOrderPrice + totalDeliveryFee,
                    totalDeliveryFee: totalDeliveryFee,
                    items: {
                        create: orderItems,
                    },
                },
                include: {
                    items: true,
                },
            });

            return res.status(201).json(order);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to create order' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
