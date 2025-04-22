import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { description, discountType, discountValue, startDate, endDate, isActive, productId, variantIds } = req.body;

    if (req.method === 'POST') {
        try {
            // Basic validation
            if (!discountType || !discountValue || !startDate || !endDate || !productId) {
                return res.status(400).json({ success: false, error: 'Missing required fields.' });
            }
            if (new Date(startDate) >= new Date(endDate)) {
                return res.status(400).json({ success: false, error: 'endDate must be after startDate.' });
            }

            // Check if product exists
            const product = await prisma.product.findUnique({
                where: { id: productId },
            });
            if (!product) {
                return res.status(404).json({ success: false, error: 'Product not found.' });
            }

            // Validate variantIds if provided
            if (variantIds && Array.isArray(variantIds) && variantIds.length > 0) {
                const variants = await prisma.variant.findMany({
                    where: { id: { in: variantIds } },
                });
                if (variants.length !== variantIds.length) {
                    return res.status(404).json({ success: false, error: 'One or more variants not found.' });
                }
            }

            const offer = await prisma.offer.create({
                data: {
                    description,
                    discountType,
                    discountValue: Number(discountValue), // Ensure discountValue is a number
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    isActive: isActive !== undefined ? isActive : true, // Default to true if not provided
                    product: { connect: { id: productId } },
                    Variant: variantIds && variantIds.length > 0 ? { connect: variantIds.map(id => ({ id })) } : undefined,
                },
                include: {
                    product: true,
                    Variant: true,
                },
            });

            res.status(201).json({ success: true, offer });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Failed to create offer.' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}