import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const brands = await prisma.brand.findMany();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching brands' });
    }
}
