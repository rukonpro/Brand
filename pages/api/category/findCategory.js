import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { name } = req.query;

            const filters = {};

            if (name) {
                filters.name = {
                    contains: name, // Use 'contains' for partial matching, case-sensitive
                    mode: 'insensitive', // Case-insensitive matching
                };
            }


            const categories = await prisma.category.findMany({
                where: filters,
            });

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch categories' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
