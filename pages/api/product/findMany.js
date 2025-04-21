import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Optionally handle query parameters for filtering, sorting, or pagination
            const { name, categoryId, categoryName, brandId, brandName, availability, status, productIds, page = 1, pageSize = 10 } = req.query;

            // Initialize the whereCondition
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

            // Filtering by product name (insensitive search)
            if (name) {
                whereCondition.name = { contains: name, mode: 'insensitive' };
            }

            // Query for products, including related category and brand names
            const products = await prisma.product.findMany({
                where: {
                    ...whereCondition,
                    ...(categoryName && {
                        category: {
                            name: { contains: categoryName, mode: 'insensitive' },
                        }
                    }),
                    ...(brandName && {
                        brand: {
                            name: { contains: brandName, mode: 'insensitive' },
                        }
                    })
                },
                skip: (page - 1) * pageSize,  // Pagination: skip records
                take: parseInt(pageSize),     // Pagination: limit records
                include: {
                    brand: true,   // Include brand details
                    category: true, // Include category details
                    offers: true,    // Include offers if needed
                    variants: {
                        include: {
                            attributes: true
                        }
                    }
                },
            });
            res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
            res.status(200).json(products);
        } catch (error) {
            console.error(error); // Log error for debugging
            res.status(500).json({ error: 'An error occurred while fetching the products.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
