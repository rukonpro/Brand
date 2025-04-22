import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ success: false, error: 'Offer ID is required.' });
    }

    try {
        const offer = await prisma.offer.findUnique({
            where: { id },
            include: {
                Variant: true,
            },
        });

        if (!offer) {
            return res.status(404).json({ success: false, error: 'Offer not found.' });
        }

        // Validate productId exists
        const product = await prisma.product.findUnique({
            where: { id: offer.productId },
        });
        if (!product) {
            return res.status(400).json({ success: false, error: 'Invalid productId in offer.' });
        }

        res.setHeader('Cache-Control', 'no-store');
        res.status(200).json({ success: true, offer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to fetch offer.' });
    } finally {
        await prisma.$disconnect();
    }
}