import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';


const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { method } = req;

    if (method === 'PATCH') {
        try {
            const session = await getSession({ req });

            if (!session) {
                return res.status(401).json({ message: 'Unauthorized' });
            }


            const userId = session?.user?.id;
            const { addressId } = req.body;

            // Validate that addressId is provided
            if (!addressId) {
                return res.status(400).json({ message: 'Missing addressId' });
            }


            // Check if the address belongs to the current user
            const address = await prisma.shippingAddress.findUnique({
                where: { id: addressId },
            });

            if (!address || address.userId !== userId) {
                return res.status(404).json({ message: 'Address not found or does not belong to you' });
            }

            // Update all other addresses for this user to isDefault = false
            await prisma.shippingAddress.updateMany({
                where: {
                    userId,
                    id: { not: addressId },  // Exclude the current address
                },
                data: { isDefault: false },
            });

            // Set the selected address as default
            const updatedAddress = await prisma.shippingAddress.update({
                where: { id: addressId },
                data: { isDefault: true },
            });

            res.status(200).json({
                message: 'Default address updated successfully',
                address: updatedAddress,
            });
        } catch (error) {
            console.error("Error updating default address:", error);
            res.status(500).json({ error: 'Failed to update default address' });
        }
    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
