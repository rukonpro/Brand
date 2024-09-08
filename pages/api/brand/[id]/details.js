import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;  // Extract the id from the URL parameter

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const brand = await prisma.brand.findUnique({
            where: { id },
        });

        if (!brand) {
            return res.status(404).json({ error: 'Brand not found' });
        }

        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching brand details' });
    }
}
