import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method !== 'PATCH') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, logo, website } = req.body;

    try {
        const updatedBrand = await prisma.brand.update({
            where: { id },
            data: { name, logo, website },
        });
        res.status(200).json(updatedBrand);
    } catch (error) {
        res.status(500).json({ error: 'Error updating brand' });
    }
}
