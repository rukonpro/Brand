import { PrismaClient } from '@prisma/client';
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { method } = req;

    if (method === 'GET') {
        try {
            const session = await getSession({ req });

            if (!session) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const userId = session.user.id;

            // Fetch the default shipping address for the user
            const defaultAddress = await prisma.shippingAddress.findFirst({
                where: {
                    userId: userId,
                    isDefault: true, // Only get the default address
                },
            });

            if (!defaultAddress) {
                return res.status(404).json({ message: 'Default address not found' });
            }

            res.status(200).json(defaultAddress);
        } catch (error) {
            console.error("Error fetching default address:", error);
            res.status(500).json({ error: 'Failed to fetch default address' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
