import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            // Extract an array of IDs from the request body
            const { ids } = req.body;

            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({ error: 'Invalid request: `ids` should be a non-empty array' });
            }

            // Perform bulk delete operation
            const deleteResult = await prisma.banner.deleteMany({
                where: {
                    id: {
                        in: ids
                    }
                }
            });

            res.status(200).json({ message: 'Banners deleted successfully', count: deleteResult.count });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting banners' });
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
