import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const cache = new Map(); // ক্যাশ অবজেক্ট

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    try {
      const { userId, cartItemId, newQuantity } = req.body;
      const cacheKey = `cart:${userId}`;

      // ডেটাবেজে কার্ট আইটেম আপডেট করুন
      const updatedItem = await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity: newQuantity },
      });

      // ক্যাশ আপডেট করুন
      if (cache.has(cacheKey)) {
        const cachedData = cache.get(cacheKey);
        const updatedCartItems = cachedData.cartItems.map(item => {
          if (item.id === cartItemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });

        // ক্যাশে আপডেট করুন
        cache.set(cacheKey, {
          ...cachedData,
          cartItems: updatedCartItems,
        });
      }

      return res.status(200).json({ message: 'Cart item updated successfully', item: updatedItem });
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong while updating the cart' });
    }
  }

  // আপনার GET মেথড কোড এখানে থাকবে
}
