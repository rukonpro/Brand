import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;  // Extract the id from the URL parameter

    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const deletedCategory = await prisma.category.delete({
            where: { id },
        });
        res.status(200).json({ message: 'Category deleted successfully', deletedCategory });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category' });
    }
}
