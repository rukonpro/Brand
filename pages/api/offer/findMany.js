// pages/api/offers/index.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// pages/api/offers/index.js

import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const {
                discountType,
                isActive,
                startDate,
                endDate,
                productId,
                page = 1,
                limit = 10
            } = req.query;

            // Build the query object based on the provided filters
            const filters = {};

            if (discountType) {
                filters.discountType = discountType; // PERCENTAGE or FLAT
            }

            if (isActive !== undefined) {
                filters.isActive = isActive === 'true'; // Convert string to boolean
            }

            if (startDate) {
                filters.startDate = {
                    gte: new Date(startDate), // gte = greater than or equal
                };
            }

            if (endDate) {
                filters.endDate = {
                    lte: new Date(endDate), // lte = less than or equal
                };
            }

            if (productId) {
                filters.productId = productId;
            }

            // Calculate pagination variables
            const skip = (parseInt(page) - 1) * parseInt(limit);
            const take = parseInt(limit);

            // Fetch offers based on filters and pagination
            const offers = await prisma.offer.findMany({
                where: filters,
                include: {
                    product: true, // Include related product data if needed
                },
                skip,
                take,
            });

            // Count the total number of offers
            const totalOffers = await prisma.offer.count({ where: filters });

            res.status(200).json({
                success: true,
                data: offers,
                meta: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(totalOffers / limit),
                    totalOffers,
                    limit: parseInt(limit),
                },
            });
        } catch (error) {
            console.error('Error fetching offers:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch offers',
            });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

