import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { parentId } = req.query;

            const filters = {};
            if(!parentId){
                filters.parentId = null;
            }
            if (parentId){
                filters.parentId = parentId;
            }

            const include={
                           include:{
                               children:true
                           }
            }


            const categories = await prisma.category.findMany({
                where: filters,
                include: { children: true  },
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
