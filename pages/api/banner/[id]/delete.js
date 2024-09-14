import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const banner = await prisma.banner.delete({
                where: { id: id }
            });

            res.status(200).json({ message: 'Banner deleted successfully', banner });
        } catch (error) {
            if (error.code === 'P2025') { // Prisma error code for "Record to delete not found"
                res.status(404).json({ error: 'Banner not found' });
            } else {
                res.status(500).json({ error: 'Error deleting banner' });
            }
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}