import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { method } = req;
    const { discountType, isActive, productId, startDate, endDate, page, pageSize } = req.query;

    if (method === 'GET') {
        try {
            // Build filter conditions
            const where = {};

            if (discountType) {
                if (discountType !== 'PERCENTAGE' && discountType !== 'FLAT') {
                    return res.status(400).json({ success: false, error: 'Invalid discountType. Must be PERCENTAGE or FLAT.' });
                }
                where.discountType = discountType;
            }

            if (isActive !== undefined) {
                where.isActive = isActive === 'true' || isActive === '1';
            }

            if (productId) {
                const product = await prisma.product.findUnique({
                    where: { id: productId },
                });
                if (!product) {
                    return res.status(404).json({ success: false, error: 'Product not found.' });
                }
                where.productId = productId;
            }

            if (startDate || endDate) {
                where.startDate = {};
                where.endDate = {};
                if (startDate) {
                    if (isNaN(new Date(startDate).getTime())) {
                        return res.status(400).json({ success: false, error: 'Invalid startDate format.' });
                    }
                    where.startDate.gte = new Date(startDate);
                }
                if (endDate) {
                    if (isNaN(new Date(endDate).getTime())) {
                        return res.status(400).json({ success: false, error: 'Invalid endDate format.' });
                    }
                    where.endDate.lte = new Date(endDate);
                }
            }

            // Pagination parameters
            const pageNum = Number(page) || 1;
            const pageSizeNum = Number(pageSize) || 10;
            if (pageNum < 1 || pageSizeNum < 1) {
                return res.status(400).json({ success: false, error: 'Invalid page or pageSize. Must be positive numbers.' });
            }
            const skip = (pageNum - 1) * pageSizeNum;
            const take = pageSizeNum;

            // Fetch valid product IDs to filter out orphaned offers
            const validProductIds = (await prisma.product.findMany({ select: { id: true } })).map(p => p.id);
            where.productId = { in: validProductIds };

            // Fetch offers with pagination
            const [offers, totalCount] = await Promise.all([
                prisma.offer.findMany({
                    where,
                    include: {
                        Variant: true, // Include Variant relation
                    },
                    orderBy: { startDate: 'desc' },
                    skip,
                    take,
                }),
                prisma.offer.count({ where }),
            ]);

            // Calculate pagination metadata
            const totalPages = Math.ceil(totalCount / pageSizeNum);
            const pagination = {
                totalProducts: totalCount,
                totalPages,
                currentPage: pageNum,
                pageSize: pageSizeNum,
                hasNextPage: pageNum < totalPages,
                hasPrevPage: pageNum > 1,
            };

            // Prevent caching to ensure fresh data
            res.setHeader('Cache-Control', 'no-store');

            // Return paginated response with metadata
            res.status(200).json({
                success: true,
                offers,
                pagination,
            });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to fetch offers.' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}