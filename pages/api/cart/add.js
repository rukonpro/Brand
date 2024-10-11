import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, item } = req.body;
    const { productId, details } = item;

    // মোট quantity হিসাব করুন নতুন details থেকে
    const totalQuantity = details.reduce((sum, detail) => sum + detail.quantity, 0);

    try {
      // 1. প্রোডাক্টের তথ্য সংগ্রহ করুন
      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: {
          price: true,
          discountPercentage: true,
          taxPercentage: true,
          deliveryFee: true,
        },
      });

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // 2. নতুন মোট মূল্য হিসাব করুন
      const itemTotalPrice = product.price * totalQuantity;
      const discount = (itemTotalPrice * (product.discountPercentage || 0)) / 100;
      const totalPriceWithDiscount = itemTotalPrice - discount;
      const totalTax = (totalPriceWithDiscount * (product.taxPercentage || 0)) / 100;
      const finalTotalPrice = totalPriceWithDiscount + totalTax + product.deliveryFee;

      // 3. কার্ট আপডেট করা বা নতুন কার্ট তৈরি করা
      const existingCart = await prisma.cart.findFirst({
        where: { userId: userId },
        include: {
          items: {
            where: { productId: productId },
            include: { details: true }, // Include existing details
          },
        },
      });

      if (existingCart) {
        const existingCartItem = existingCart.items[0];

        if (existingCartItem) {
          // প্রোডাক্ট থাকলে আগের ডিটেইলসগুলো মুছে ফেলে নতুন ডিটেইলস যোগ করুন
          await prisma.cartItem.update({
            where: { id: existingCartItem.id },
            data: {
              totalQuantity: totalQuantity, // নতুন totalQuantity
              totalPrice: itemTotalPrice, // নতুন totalPrice
              discountPercentage: product.discountPercentage,
              totalPriceWithDiscount: totalPriceWithDiscount,
              taxPercentage: product.taxPercentage,
              totalTax: totalTax,
              deliveryFee: product.deliveryFee,
              details: {
                deleteMany: {}, // পুরনো ডিটেইলস মুছে ফেলা
                create: details.map(detail => ({
                  size: detail.size,
                  color: detail.color,
                  quantity: detail.quantity,
                })),
              },
            },
          });
        } else {
          // যদি প্রোডাক্ট না থাকে, নতুন আইটেম তৈরি করুন
          await prisma.cart.update({
            where: { id: existingCart.id },
            data: {
              items: {
                create: {
                  productId: productId,
                  totalQuantity: totalQuantity,
                  details: {
                    create: details.map(detail => ({
                      size: detail.size,
                      color: detail.color,
                      quantity: detail.quantity,
                    })),
                  },
                  totalPrice: itemTotalPrice,
                  discountPercentage: product.discountPercentage,
                  totalPriceWithDiscount: totalPriceWithDiscount,
                  taxPercentage: product.taxPercentage,
                  totalTax: totalTax,
                  deliveryFee: product.deliveryFee,
                },
              },
            },
          });
        }
      } else {
        // নতুন কার্ট তৈরি করা
        await prisma.cart.create({
          data: {
            userId: userId,
            items: {
              create: {
                productId: productId,
                totalQuantity: totalQuantity,
                details: {
                  create: details.map(detail => ({
                    size: detail.size,
                    color: detail.color,
                    quantity: detail.quantity,
                  })),
                },
                totalPrice: itemTotalPrice,
                discountPercentage: product.discountPercentage,
                totalPriceWithDiscount: totalPriceWithDiscount,
                taxPercentage: product.taxPercentage,
                totalTax: totalTax,
                deliveryFee: product.deliveryFee,
              },
            },
          },
        });
      }

      return res.status(200).json({
        message: 'Cart updated successfully.',
        cart: {
          userId: userId,
          items: [
            {
              productId,
              totalQuantity,
              details,
              totalPrice: itemTotalPrice,
              totalPriceWithDiscount,
              totalTax,
              finalTotalPrice,
            },
          ],
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating cart.' });
    }
  } else {
    // Unsupported request method
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
