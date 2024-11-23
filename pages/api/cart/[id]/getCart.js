import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const userId = req.query.id; // URL থেকে userId নিন

      if (!userId) {
        return res.status(200).json({ message: 'You are unauthorized' });
      }

      // ইউজারের জন্য কার্ট আইটেমগুলো পান
      const cartItems = await prisma.cartItem.findMany({
        where: { userId },
      });

      if (cartItems.length === 0) {
        return res.status(200).json({ message: 'Cart is empty' });
      }

      let originalPrice = 0;
      let totalDiscount = 0;
      let subTotalPrice = 0;



      // কার্ট আইটেমের ডেটা প্রক্রিয়াকরণ
      const itemsWithVariants = await Promise.all(
        cartItems.map(async (item) => {
          // মূল দাম হিসাব করুন
          originalPrice += item.price * item.quantity;

          const discountPercent = item.discountPercent || 0;
          // ডিসকাউন্টের পর দাম
          const discountAmount = (item.price * discountPercent) / 100;
          const discountedPrice = item.price - discountAmount;
          const itemSubTotal = discountedPrice * item.quantity;

          // মোট সাবটোটাল
          subTotalPrice += itemSubTotal;
          totalDiscount += discountAmount * item.quantity;

          // এখন আমরা id ব্যবহার করে ভেরিয়েন্ট তথ্য আনব
          const variant = await prisma.variant.findUnique({
            where: { id: item.variantId }, // এখানে variantId ব্যবহার করুন
          });

          return {
            ...item,
            discountPercent,
            discountAmount,
            discountedPrice,
            variant, // শুধুমাত্র যোগ করা ভেরিয়েন্ট
          };
        })
      );

      // ট্যাক্স শুধু সাবটোটাল প্রাইসের উপর নির্ধারণ করুন
      const taxPercent = 1; // ট্যাক্স %
    
      const totalTax = (subTotalPrice * taxPercent) / 100;

      // মোট দাম হিসাব করুন
      const totalPrice = subTotalPrice + totalTax;

      const response = {
        cartSummary: {
          totalItems: cartItems.length,
          originalPrice,
          totalDiscount,
          subTotalPrice,
          taxPercent,
          totalTax,
          totalPrice,
        },
        cartItems: itemsWithVariants.filter((item) => item.variant), // কেবলমাত্র যোগ করা ভেরিয়েন্টসহ
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong while fetching the cart' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
