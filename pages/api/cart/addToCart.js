import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { productId, variantId, productName, price, quantity, selectedAttributes, userId } = req.body;

      // Check if the product is already in the cart for the same variant and user
      const existingCartItem = await prisma.cartItem.findFirst({
        where: {
          productId,
          variantId,
          userId,
        },
      });

      if (existingCartItem) {
        // Update quantity if the item already exists
        const updatedItem = await prisma.cartItem.update({
          where: { id: existingCartItem.id },
          data: {
            quantity: existingCartItem.quantity + quantity,
          },
        });
        return res.status(200).json({ message: 'Cart updated successfully', item: updatedItem });
      } else {
        // Create a new cart item
        const newItem = await prisma.cartItem.create({
          data: {
            productId,
            variantId,
            productName,
            price,
            quantity,
            selectedAttributes,
            userId,
          },
        });
        return res.status(201).json({ message: 'Item added to cart successfully', item: newItem });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong while adding to the cart' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
