import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;  // Query থেকে userId নিন

    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    try {
      // `findFirst()` ব্যবহার করে `userId` দিয়ে কার্ট খুঁজুন
      const cart = await prisma.cart.findFirst({
        where: { userId: id },  // এখানে userId পাস করা হচ্ছে
        include: {
          items: {
            include: {
              product: {
                select: {
                  name: true,
                  price: true,
                  discountPercentage: true,
                  taxPercentage: true,
                  deliveryFee: true,
                },
              },
              details:true
            },
          },
        },
      });

      // যদি কার্ট না পাওয়া যায়
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

     
      // রেসপন্সে কার্টের তথ্য ফেরত দিন
      return res.status(200).json({
        message: 'Cart retrieved successfully.',
        cart,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving cart.' });
    }
  } else {
    // Unsupported request method
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
