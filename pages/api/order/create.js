import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        userId,
        shippingAddressId,
        billingAddressId,
        orderItems,
        orderSummery,
        paymentMethod,
        orderNotes,
        estimatedDeliveryDate,
        deliveryMethod,
      } = req.body;
     
      // Validate the request body
      if (!userId || !shippingAddressId || !billingAddressId || !orderItems || !orderSummery) {
        return res.status(400).json({ message: 'Missing required fields.' });
      }

      // Create the order
      const order = await prisma.order.create({
        data: {
          userId,
          shippingAddressId,
          billingAddressId,
          paymentMethod,
          paymentStatus: 'PENDING', // Default payment status
          orderStatus: 'PENDING', // Default order status
          deliveryMethod,
          orderNotes,
          estimatedDeliveryDate: estimatedDeliveryDate ? new Date(estimatedDeliveryDate) : null,
          orderItems: {
            create: orderItems.map((item) => ({
              productId: item.productId,
              variantId: item.variantId,
              productName: item.productName,
              price: item.price,
              quantity: item.quantity,
              discountPercent:item.discountPercent,
              discountAmount: item.discountAmount,
              discountedPrice: item.discountedPrice,
              taxAmount: item.taxAmount,
            })),
          },
          orderSummery: {
            create: {
              totalItems: orderSummery.totalItems,
              originalPrice: orderSummery.originalPrice,
              totalDiscount: orderSummery.totalDiscount,
              subTotalPrice: orderSummery.subTotalPrice,
              taxPercent: orderSummery.taxPercent,
              totalTax:orderSummery.totalTax,
              totalPrice: orderSummery.totalPrice,
            },
          },
        },
        include: {
          orderItems: true,
          orderSummery: true,
        },
      });

      return res.status(201).json({
        message: "Order Successfully",
        order
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
