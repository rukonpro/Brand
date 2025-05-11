import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.id) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = session.user.id;

    if (req.method === 'POST') {
        try {
            const { productId, variantId } = req.body;
            if (!productId) {
                return res.status(400).json({ error: 'Product ID is required' });
            }
            const user = await prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const product = await prisma.product.findUnique({ where: { id: productId } });
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            if (variantId) {
                const variant = await prisma.variant.findUnique({ where: { id: variantId } });
                if (!variant || variant.productId !== productId) {
                    return res.status(404).json({ error: 'Invalid variant' });
                }
            }
            const existing = await prisma.saveForLater.findFirst({
                where: { userId, productId, variantId: variantId || null },
            });
            if (existing) {
                return res.status(400).json({ error: 'Item already saved' });
            }
            const saveForLater = await prisma.saveForLater.create({
                data: { userId, productId, variantId: variantId || null },
                include: {
                    product: { select: { id: true, name: true, basePrice: true, images: true } },
                    variant: variantId ? { select: { id: true, price: true, sku: true, images: true } } : false,
                },
            });
            return res.status(201).json({ message: 'Item saved', data: saveForLater });
        } catch (error) {
            console.error('POST /api/save-for-later:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'GET') {
        try {
            // Parse query parameters
            const pageNum = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.limit) || 10;
            const skip = (pageNum - 1) * pageSize;

            // Validate pagination parameters
            if (pageNum < 1 || pageSize < 1) {
                return res.status(400).json({ error: 'Invalid page or pageSize' });
            }

            // Fetch paginated saved items
            const [savedItems, totalProducts] = await Promise.all([
                prisma.saveForLater.findMany({
                    where: { userId },
                    include: {
                        product: { select: { id: true, name: true, basePrice: true, images: true, status: true } },
                        variant: { select: { id: true, price: true, sku: true, images: true, availability: true } },
                    },
                    orderBy: { createdAt: 'desc' },
                    skip,
                    take: pageSize,
                }),
                prisma.saveForLater.count({ where: { userId } }),
            ]);

            // Calculate pagination metadata
            const totalPages = Math.ceil(totalProducts / pageSize);

            return res.status(200).json({
                data: savedItems,
                pagination: {
                    totalProducts,
                    totalPages,
                    currentPage: pageNum,
                    pageSize,
                    hasNextPage: pageNum < totalPages,
                    hasPrevPage: pageNum > 1,
                },
            });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ error: 'SaveForLater ID is required' });
            }
            const item = await prisma.saveForLater.findFirst({ where: { id, userId } });
            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }
            await prisma.saveForLater.delete({ where: { id } });
            return res.status(200).json({ message: 'Item removed' });
        } catch (error) {
            console.error('DELETE /api/save-for-later:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}