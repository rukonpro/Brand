import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Handle query parameters for filtering, sorting, or pagination
            const {
                name,
                categoryId,
                categoryName,
                brandId,
                brandName,
                availability,
                status,
                productIds,
                page = 1,
                limit = 10
            } = req.query;

            // Initialize the whereCondition
            let whereCondition = {
                ...(categoryId && { categoryId }),
                ...(brandId && { brandId }),
                ...(availability && { availability }),
                ...(status && { status }),
            };

            // If productIds is present, convert it into an array and add to the where condition
            if (productIds) {
                const idsArray = productIds.split(',').map(id => parseInt(id)); // Convert to integers for safety
                whereCondition.id = {
                    in: idsArray,
                };
            }

            // Filtering by product name (insensitive search)
            if (name) {
                whereCondition.name = { contains: name, mode: 'insensitive' };
            }

            // Add categoryName and brandName to whereCondition
            if (categoryName) {
                whereCondition.category = {
                    name: { contains: categoryName, mode: 'insensitive' },
                };
            }
            if (brandName) {
                whereCondition.brand = {
                    name: { contains: brandName, mode: 'insensitive' },
                };
            }

            // Parse pagination parameters
            const pageNum = parseInt(page, 10) || 1;
            const pageSize = parseInt(limit, 10) || 10;
            const skip = (pageNum - 1) * pageSize;

            // Fetch total count of products matching the filters
            const totalProducts = await prisma.product.count({
                where: whereCondition,
            });

            // Query for products, including related category and brand names
            const products = await prisma.product.findMany({
                where: whereCondition,
                skip,
                take: pageSize,
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

            // Calculate total pages
            const totalPages = Math.ceil(totalProducts / pageSize);

            // Return paginated response with metadata
            res.status(200).json({
                data: products,
                pagination: {
                    totalProducts,
                    totalPages,
                    currentPage: pageNum,
                    pageSize,
                    hasNextPage: pageNum < totalPages,
                    hasPrevPage: pageNum > 1,
                }
            });
        } catch (error) {
            console.error(error); // Log error for debugging
            res.status(500).json({ error: 'An error occurred while fetching the products.' });
        } finally {
            await prisma.$disconnect(); // Ensure Prisma client disconnects
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}