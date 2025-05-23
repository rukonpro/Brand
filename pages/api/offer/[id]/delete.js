import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ success: false, error: 'Offer ID is required.' });
    }

    try {
        // Validate offer exists
        const existingOffer = await prisma.offer.findUnique({
            where: { id },
        });
        if (!existingOffer) {
            return res.status(404).json({ success: false, error: 'Offer not found.' });
        }

        // Delete offer
        await prisma.offer.delete({
            where: { id },
        });

        // Prevent caching
        res.setHeader('Cache-Control', 'no-store');
        res.status(200).json({ success: true, message: 'Offer deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to delete offer.' });
    } finally {
        await prisma.$disconnect();
    }
}
