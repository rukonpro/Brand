import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {

        const {name} = req.query;
        let filter={};

        if(name){
            filter.name = name;
        }

        const brands = await prisma.brand.findMany({
            where:filter,
        });
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching brands' });
    }
}
