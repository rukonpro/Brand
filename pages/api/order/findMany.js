import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Extract query parameters
        const {
            userId,
            status,
            paymentStatus,
            page = 1,  // Default to page 1
            pageSize = 10,  // Default to 10 items per page
        } = req.query;

        // Convert page and pageSize to numbers
        const pageNumber = parseInt(page, 10);
        const pageSizeNumber = parseInt(pageSize, 10);

        if (isNaN(pageNumber) || isNaN(pageSizeNumber)) {
            return res.status(400).json({ error: 'Invalid pagination parameters' });
        }

        try {
            // Construct the filter object
            const filter = {};
            if (userId) filter.userId = userId;
            if (status) filter.status = status;
            if (paymentStatus) filter.paymentStatus = paymentStatus;

            // Fetch orders with filtering and pagination
            const orders = await prisma.order.findMany({
                where: filter,
                skip: (pageNumber - 1) * pageSizeNumber,  // Calculate offset
                take: pageSizeNumber,  // Limit number of results
                orderBy: {
                    createdAt: 'desc',  // Order by creation date, descending
                },
                include: {
                    items: true,
                },
            });

            // Count total orders for pagination metadata
            const totalOrders = await prisma.order.count({
                where: filter,
            });

            // Calculate total pages
            const totalPages = Math.ceil(totalOrders / pageSizeNumber);

            return res.status(200).json({
                orders,
                pagination: {
                    currentPage: pageNumber,
                    pageSize: pageSizeNumber,
                    totalOrders,
                    totalPages,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to fetch orders' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
