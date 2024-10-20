import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const cache = new Map(); // ক্যাশ অবজেক্ট

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const userId = req.query.userId; // URL থেকে userId নিন
      const cacheKey = `cart:${userId}`; // ক্যাশ কি তৈরি করুন

      // ক্যাশে চেক করুন
      if (cache.has(cacheKey)) {
        return res.status(200).json(cache.get(cacheKey)); // ক্যাশ থেকে তথ্য ফেরত দিন
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
      let totalTax = 0;
      const taxPercent = 5; // ট্যাক্স %
      const discountPercent = 10; // ডিসকাউন্ট %

      // কার্ট আইটেমের ডেটা প্রক্রিয়াকরণ
      const itemsWithVariants = await Promise.all(
        cartItems.map(async (item) => {
          // মূল দাম হিসাব করুন
          originalPrice += item.price * item.quantity;

          // ডিসকাউন্টের পর দাম
          const discountAmount = (item.price * discountPercent) / 100;
          const discountedPrice = item.price - discountAmount;
          const itemSubTotal = discountedPrice * item.quantity;

          // ট্যাক্স হিসাব করুন
          const taxAmount = (itemSubTotal * taxPercent) / 100;

          // মোট সাবটোটাল ও ট্যাক্স
          subTotalPrice += itemSubTotal;
          totalTax += taxAmount;
          totalDiscount += discountAmount * item.quantity;

          // এখন আমরা id ব্যবহার করে ভেরিয়েন্ট তথ্য আনব
          const variant = await prisma.variant.findUnique({
            where: { id: item.variantId }, // এখানে variantId ব্যবহার করুন
          });

          return {
            ...item,
            discountAmount,
            discountedPrice,
            taxAmount,
            variant, // শুধুমাত্র যোগ করা ভেরিয়েন্ট
          };
        })
      );

      // মোট দাম হিসাব করুন
      const totalPrice = subTotalPrice + totalTax;

      const response = {
        cartSummary: {
          totalItems: cartItems.length,
          originalPrice,
          totalDiscount,
          subTotalPrice,
          taxPercent,
          taxWithPrice: totalTax,
          totalPrice,
        },
        cartItems: itemsWithVariants.filter(item => item.variant), // কেবলমাত্র যোগ করা ভেরিয়েন্টসহ
      };

      // ক্যাশে সেভ করুন
      cache.set(cacheKey, response);

      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong while fetching the cart' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
