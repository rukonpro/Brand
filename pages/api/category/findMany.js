import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Fetch all categories with their nested children
            const categories = await prisma.category.findMany({
                where: {
                    parentId: null, // Get only root categories
                },
                include: {
                    children: {
                        include: {
                            children: {
                                include:{
                                    children: {
                                        include:{
                                            children: {
                                                include:{
                                                    children:{
                                                        include:{
                                                            children:true
                                                        }
                                                    },
                                                }
                                            },
                                        }
                                    },
                                }
                            }, // Recursively include nested children
                        },
                    },
                },
            });

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch categories' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
