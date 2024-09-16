import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        try {
            // Find the record by ID to ensure it exists
            const address = await prisma.shippingAddress.findUnique({
                where: { id: id },
            });

            if (!address) {
                return res.status(404).json({ error: 'Shipping address not found' });
            }

            // Delete the record
            await prisma.shippingAddress.delete({
                where: { id: id },
            });

            // Send a success response
            return res.status(200).json({ message: 'Shipping address deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
