import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const { userId } = req.query; // Expecting userId in the query parameters

            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            // Delete all cart items for the specific user
            const deleteResult = await prisma.cartItem.deleteMany({
                where: {
                    userId: userId,
                },
            });

            // Check if any items were deleted
            if (deleteResult.count === 0) {
                return res.status(404).json({ message: 'No items found in the cart for this user' });
            }

            return res.status(200).json({
                message: `${deleteResult.count} item(s) removed from the cart successfully`,
            });
        } catch (error) {
            return res.status(500).json({ error: 'Something went wrong while deleting the items' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
