import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: 'Category ID is required' });
        }

        try {
            // First, delete nested children categories
            await prisma.category.deleteMany({
                where: {
                    parentId: id,
                },
            });

            // Then, delete the category itself
            const deletedCategory = await prisma.category.delete({
                where: {
                    id,
                },
            });

            res.status(200).json({message: 'Category deleted successfully',deletedCategory});
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete category' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
