import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        const { orderId, status } = req.body;

        // Validate input
        if (!orderId || !status) {
            return res.status(400).json({ error: 'Order ID and status are required' });
        }

        try {
            // Update the order status
            const updatedOrder = await prisma.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    status: status, // Set the new status
                },
                include: {
                    items: true, // Optionally include related items
                },
            });

            return res.status(200).json(updatedOrder);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to update order status' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
