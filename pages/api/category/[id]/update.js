// /pages/api/category/[id]/update.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;  // Extract the id from the URL parameter

    if (req.method !== 'PATCH') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, photo, description } = req.body;

    try {
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name,
                photo,
                description,
            },
        });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error updating category' });
    }
}
