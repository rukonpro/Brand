
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, logo, website } = req.body;

    try {
        const newBrand = await prisma.brand.create({
            data: {
                name,
                logo,
                website,
            },
        });
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(500).json({ error: 'Error creating brand' });
    }
}
