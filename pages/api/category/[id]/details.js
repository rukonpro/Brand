// /pages/api/category/[id]/details.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;  // Extract the id from the URL parameter

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching category details' });
    }
}
