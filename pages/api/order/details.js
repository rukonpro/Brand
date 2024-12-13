import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { orderId, userId } = req.query;

        if (!orderId) {
            return res.status(400).json({ error: 'Order ID is required' });
        }
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        try {
            // Fetch the order by ID
            const order = await prisma.order.findUnique({
                where: {
                    id: orderId,
                    userId: userId,
                },
                include: {
                    orderItems: {
                        include:{
                            variant:{
                                include:{
                                    attributes:true
                                }
                            }
                        }
                    },
                    orderSummery: true,
                    shippingAddress: true,
                    billingAddress: true
                }
            });

            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            return res.status(200).json(order);
        } catch (error) {

            return res.status(500).json({ error: 'Failed to retrieve order' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
