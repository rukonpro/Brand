import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { name, parentId } = req.query;

            const filters = {};
            if(!name){
                filters.parentId = parentId||null;
            }

            if (name) {
                filters.name = {
                    contains: name, // Use 'contains' for partial matching, case-sensitive
                    mode: 'insensitive', // Case-insensitive matching
                };
            }

            const include= {
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
            }



            const categories = await prisma.category.findMany({
                where: filters,
                include:name?{}:include,
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
