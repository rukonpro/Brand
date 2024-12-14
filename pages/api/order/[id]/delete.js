import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        try {
            // Delete the order
            const deletedOrder = await prisma.order.delete({
                where: {
                    id: id,
                },
                include: {
                    orderSummery: true,
                    orderItems: true
                }
            });

            return res.status(200).json({
                message: 'Order deleted successfully',
                deletedOrder,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to delete order' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
