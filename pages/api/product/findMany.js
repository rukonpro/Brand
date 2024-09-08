// pages/api/products/index.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Optionally handle query parameters for filtering, sorting, or pagination
            const { categoryId, brandId, availability, status, page = 1, pageSize = 10 } = req.query;

            const products = await prisma.product.findMany({
                where: {
                    ...(categoryId && { categoryId }),
                    ...(brandId && { brandId }),
                    ...(availability && { availability }),
                    ...(status && { status }),
                },
                skip: (page - 1) * pageSize,  // Pagination: skip records
                take: parseInt(pageSize),     // Pagination: limit records
                include: {
                    brand: true,
                    category: true,
                    dimension: true,
                },
            });

            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'An error occurred while fetching the products.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
