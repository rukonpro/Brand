import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Create a new banner
        try {
            const { image, title, link, startDate, endDate } = req.body;

            if (!image || !endDate) {
                return res.status(400).json({ error: 'Required fields are missing' });
            }

            const newBanner = await prisma.banner.create({
                data: {
                    image,
                    title,
                    link,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                },
            });

            res.status(201).json(newBanner);
        } catch (error) {
            res.status(500).json({ error: 'Error creating banner' });
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}