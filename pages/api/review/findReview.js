import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { productId } = req.query;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        try {
            const reviews = await prisma.review.findMany({
                where: { productId },
                include: {
                    user: { select: { id: true, firstName: true, lastName: true } },
                    product: { select: { id: true, name: true } },
                },
                orderBy: { createdAt: 'desc' },
            });

            res.status(200).json({ message: 'Reviews fetched successfully', reviews });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error fetching reviews', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}