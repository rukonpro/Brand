import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const { userId, itemId } = req.query; // Expecting userId and itemId in the request body

          
            // Delete the specific cart item for the user
            const deletedItem = await prisma.cartItem.delete({
                where: {
                    id: itemId, // Ensure this ID is unique
                },
            });

            // Check if the deleted item belongs to the specified user
            if (deletedItem.userId !== userId) {
                return res.status(403).json({ message: 'You do not have permission to delete this item' });
            }

            return res.status(200).json({
                message: `${deletedItem?.productName} removed from cart successfully`
            });
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ message: 'Item not found in cart' }); // Item not found
            }

            return res.status(500).json({ error: 'Something went wrong while deleting the item' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
