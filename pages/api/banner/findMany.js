import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { status, title, startDate, endDate } = req.query;

        try {
            // Start with an empty filter object
            const filter = {};

            // Apply filters only if parameters are provided
            if (status) {
                filter.status = status;
            }

            if (title) {
                filter.title = { contains: title, mode: 'insensitive' };
            }

            if (startDate) {
                const start = new Date(startDate);
                if (isNaN(start.getTime())) throw new Error('Invalid startDate');
                filter.startDate = { gte: start };
            }

            if (endDate) {
                const end = new Date(endDate);
                if (isNaN(end.getTime())) throw new Error('Invalid endDate');
                filter.endDate = { lte: end };
            }

            // Fetch banners with the filter (empty filter = all banners)
            const banners = await prisma.banner.findMany({
                where: filter,
            });
            res.status(200).json(banners);
        } catch (error) {

            res.status(500).json({ error: 'Error fetching banners', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
