
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, photo, description, parentId } = req.body;
// Validate the input data
    if (!name || !photo ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const newCategory = await prisma.category.create({
            data: {
                name,
                photo,
                description,
                parentId:parentId||null, // Optionally set the parentId if the category has a parent
            },
        });
        return res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create category' });
    }
}
