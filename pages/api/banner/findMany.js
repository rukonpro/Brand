
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Extract query parameters for filtering
        const { status, title, startDate, endDate } = req.query;

        try {
            // Build the filter object
            const filter = {};

            if (status) {
                filter.status = status;
            }

            if (title) {
                filter.title = { contains: title, mode: 'insensitive' }; // Case-insensitive search
            }

            if (startDate || endDate) {
                filter.startDate = startDate ? { gte: new Date(startDate) } : undefined;
                filter.endDate = endDate ? { lte: new Date(endDate) } : undefined;
            } else {
                filter.startDate = { lte: new Date() };
                filter.endDate = { gte: new Date() };
            }

            // Retrieve banners with filtering
            const banners = await prisma.banner.findMany({
                where: filter,
            });

            res.status(200).json(banners);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching banners' });
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}