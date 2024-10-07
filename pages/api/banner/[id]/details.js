import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Extract the banner ID from the URL
        const { id } = req.query;

        try {
            // Fetch the banner by its ID
            const banner = await prisma.banner.findUnique({
                where: { id: id }
            });

            if (banner) {
                res.status(200).json(banner);
            } else {
                res.status(404).json({ error: 'Banner not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching banner' });
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}