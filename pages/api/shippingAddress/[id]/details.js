import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;

        // Validate the ID parameter
        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        try {
            // Fetch the unique shipping address by ID
            const shippingAddress = await prisma.shippingAddress.findUnique({
                where: { id: id },
            });

            // Check if the shipping address exists
            if (!shippingAddress) {
                return res.status(404).json({ error: 'Shipping address not found' });
            }

            // Send a success response with the shipping address
            return res.status(200).json({ data: shippingAddress });
        } catch (error) {
            console.error('Error fetching shipping address:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
