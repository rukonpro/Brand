
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Optionally handle query parameters for filtering, sorting, or pagination
            const { id } = req.query;

            const product = await prisma.product.findUnique({
                where: {
                   id:id,
                },
                include: {
                    brand: true,
                    category: true,
                    dimension: true,
                    offers: true,
                },
            });
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'An error occurred while fetching the products.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
