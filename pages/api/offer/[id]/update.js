import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'PATCH') {
        try {
            const {
                description,
                discountType,
                discountValue,
                startDate,
                endDate,
                isActive,
            } = req.body;

            // Find the offer to make sure it exists
            const offer = await prisma.offer.findUnique({
                where: { id: id },
            });

            if (!offer) {
                return res.status(404).json({
                    success: false,
                    message: 'Offer not found',
                });
            }

            // Update the offer with the provided fields
            const updatedOffer = await prisma.offer.update({
                where: { id: id },
                data: {
                    description: description || offer.description,
                    discountType: discountType || offer.discountType,
                    discountValue: discountValue || offer.discountValue,
                    startDate: startDate ? new Date(startDate) : offer.startDate,
                    endDate: endDate ? new Date(endDate) : offer.endDate,
                    isActive: isActive !== undefined ? isActive : offer.isActive,
                },
            });

            res.status(200).json({
                success: true,
                message: 'Offer updated successfully',
                data: updatedOffer,
            });
        } catch (error) {
            console.error('Error updating offer:', error);
            res.status(500).json({ success: false, message: 'Failed to update offer' });
        }
    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
