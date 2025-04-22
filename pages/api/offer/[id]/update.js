import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ success: false, error: 'Offer ID is required.' });
    }

    const { description, discountType, discountValue, startDate, endDate, isActive, productId, variantIds } = req.body;

    try {
        // Validate offer exists
        const existingOffer = await prisma.offer.findUnique({
            where: { id },
        });
        if (!existingOffer) {
            return res.status(404).json({ success: false, error: 'Offer not found.' });
        }

        // Build update data
        const updateData = {};

        if (description !== undefined) updateData.description = description;
        if (discountType) {
            if (discountType !== 'PERCENTAGE' && discountType !== 'FLAT') {
                return res.status(400).json({ success: false, error: 'Invalid discountType. Must be PERCENTAGE or FLAT.' });
            }
            updateData.discountType = discountType;
        }
        if (discountValue !== undefined) {
            const value = Number(discountValue);
            if (isNaN(value) || value <= 0) {
                return res.status(400).json({ success: false, error: 'Invalid discountValue. Must be a positive number.' });
            }
            updateData.discountValue = value;
        }
        if (startDate) {
            if (isNaN(new Date(startDate).getTime())) {
                return res.status(400).json({ success: false, error: 'Invalid startDate format.' });
            }
            updateData.startDate = new Date(startDate);
        }
        if (endDate) {
            if (isNaN(new Date(endDate).getTime())) {
                return res.status(400).json({ success: false, error: 'Invalid endDate format.' });
            }
            updateData.endDate = new Date(endDate);
        }
        if (isActive !== undefined) {
            updateData.isActive = isActive === true || isActive === 'true' || isActive === '1';
        }
        if (productId) {
            const product = await prisma.product.findUnique({
                where: { id: productId },
            });
            if (!product) {
                return res.status(404).json({ success: false, error: 'Product not found.' });
            }
            updateData.productId = productId;
        }
        if (variantIds) {
            if (!Array.isArray(variantIds)) {
                return res.status(400).json({ success: false, error: 'variantIds must be an array.' });
            }
            const variants = await prisma.variant.findMany({
                where: { id: { in: variantIds } },
            });
            if (variants.length !== variantIds.length) {
                return res.status(404).json({ success: false, error: 'One or more variants not found.' });
            }
            updateData.Variant = { set: variantIds.map(id => ({ id })) };
        }

        // Update offer
        const offer = await prisma.offer.update({
            where: { id },
            data: updateData,
            include: {
                Variant: true,
            },
        });

        // Revalidate cache
        await res.revalidate('/api/offer/findMany');
        res.setHeader('Cache-Control', 'no-store');
        res.status(200).json({ success: true, offer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to update offer.' });
    } finally {
        await prisma.$disconnect();
    }
}
