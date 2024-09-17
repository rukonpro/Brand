import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { orderId } = req.query;

        if (!orderId) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        try {
            // Fetch the order by ID
            const order = await prisma.order.findUnique({
                where: {
                    id: orderId,
                },
                include: {
                    items: true, // Include items related to the order
                },
            });

            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            return res.status(200).json(order);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to retrieve order' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
