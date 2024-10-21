import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCartHandler = async (socket, data) => {

    const { userId } = data;

    try {
        if (!userId) {
            return socket.emit('cartError', { message: 'You are unauthorized' });
        }

        // Fetch cart items for the user
        const cartItems = await prisma.cartItem.findMany({
            where: { userId },
        });

        if (cartItems.length === 0) {
            return socket.emit('cartResponse', { message: 'Cart is empty' });
        }

        let originalPrice = 0;
        let totalDiscount = 0;
        let subTotalPrice = 0;
        let totalTax = 0;
        const taxPercent = 1; // Tax percentage
        let discountPercent = 0; // Discount percentage

        
        // Process cart items
        const itemsWithVariants = await Promise.all(
            cartItems.map(async (item) => {
                originalPrice += item.price * item.quantity;

                discountPercent = item.discountPercent || 10;
                const discountAmount = (item.price * discountPercent) / 100;
                const discountedPrice = item.price - discountAmount;
                const itemSubTotal = discountedPrice * item.quantity;

                const taxAmount = (itemSubTotal * taxPercent) / 100;

                subTotalPrice += itemSubTotal;
                totalTax += taxAmount;
                totalDiscount += discountAmount * item.quantity;

                // Fetch variant details using the variantId
                const variant = await prisma.variant.findUnique({
                    where: { id: item.variantId },
                });

                return {
                    ...item,
                    discountAmount,
                    discountedPrice,
                    taxAmount,
                    variant, // Add variant details
                };
            })
        );

        const totalPrice = subTotalPrice + totalTax;

        const response = {
            cartSummary: {
                totalItems: cartItems.length,
                originalPrice,
                discountPercent,
                totalDiscount,
                subTotalPrice,
                taxPercent,
                taxWithPrice: totalTax,
                totalPrice,
            },
            cartItems: itemsWithVariants.filter(item => item.variant),
        };

        // Emit the cart data to the client
        socket.emit('cartResponse', response);
    } catch (error) {
        socket.emit('cartError', { message: 'Something went wrong while fetching the cart' });
    }

};
