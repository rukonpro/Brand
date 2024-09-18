import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { page = 1, pageSize = 10, status, userId, startDate, endDate, paymentStatus, shippingAddressId } = req.query;

        try {
            const skip = (page - 1) * pageSize;
            const take = parseInt(pageSize);

            const filters = {};
            if (status) {
                filters.status = status;
            }
            if (paymentStatus) {
                filters.paymentStatus = paymentStatus;
            }
            if (userId) {
                filters.userId = userId;
            }
            if (shippingAddressId !== undefined) {
                filters.shippingAddressId = shippingAddressId;
            }

            if (startDate && endDate) {
                filters.createdAt = {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                };
            } else if (startDate) {
                filters.createdAt = {
                    gte: new Date(startDate),
                };
            } else if (endDate) {
                filters.createdAt = {
                    lte: new Date(endDate),
                };
            }

            console.log("Filters:", filters); // Log filters to debug

            const orders = await prisma.order.findMany({
                where: filters,
                skip: skip,
                take: take,
                include: {
                    items: true,
                    shippingAddress: true,
                    user: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            const totalOrders = await prisma.order.count({
                where: filters,
            });

            return res.status(200).json({
                orders,
                totalPages: Math.ceil(totalOrders / pageSize),
                currentPage: page,
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch orders' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
