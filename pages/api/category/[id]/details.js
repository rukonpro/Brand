import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: 'Category ID is required' });
        }

        try {
            // Fetch the category by ID, including nested children
            const category = await prisma.category.findUnique({
                where: {
                    id,
                },
                include: {
                    children: {
                        include: {
                            children: true, // Recursively include nested children
                        },
                    },
                },
            });

            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch category' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
