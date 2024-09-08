import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, photo, description } = req.body;

    // Validate the input data
    if (!name || !photo || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newCategory = await prisma.category.create({
            data: {
                name,
                photo,
                description,
            },
        });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error creating category' });
    }
}
