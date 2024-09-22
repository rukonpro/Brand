// pages/api/products/index.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Optionally handle query parameters for filtering, sorting, or pagination
            const {name, categoryId, brandId, availability, status,productIds, page = 1, pageSize = 10 } = req.query;

            // If productIds are provided, we need to fetch specific products based on the provided IDs
            let whereCondition = {
                ...(categoryId && { categoryId }),
                ...(brandId && { brandId }),
                ...(availability && { availability }),
                ...(status && { status }),
            };

            // If productIds is present, convert it into an array and add to the where condition
            if (productIds) {
                const idsArray = productIds.split(',');
                whereCondition.id = {
                    in: idsArray,
                };
            }

            if(name){
                whereCondition.name = { contains: name, mode: 'insensitive' };
            }
            const products = await prisma.product.findMany({
                where: whereCondition,
                skip: (page - 1) * pageSize,  // Pagination: skip records
                take: parseInt(pageSize),     // Pagination: limit records
                include: {
                    brand: true,
                    category: true,
                    dimension: true,
                    offers:true
                },
            });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching the products.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
