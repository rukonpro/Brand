import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            // Find if the offer exists
            const offer = await prisma.offer.findUnique({
                where: {
                    id: id,
                },
            });

            if (!offer) {
                return res.status(404).json({ success: false, message: 'Offer not found' });
            }

            // Delete the offer
            await prisma.offer.delete({
                where: {
                    id: id,
                },
            });

            res.status(200).json({ success: true, message: 'Offer deleted successfully' });
        } catch (error) {
            console.error('Error deleting offer:', error);
            res.status(500).json({ success: false, message: 'Failed to delete offer' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
