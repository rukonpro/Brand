import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {



    if (req.method === 'POST') {

        try {
            const {
                firstName,
                lastName,
                phoneNumber,
                landmarkArea,
                region,
                city,
                postalCode,
                streetAddress,
                deliveryLabel,
                country,
                address,
                userId
            } = req.body;

            const postalCodeString = postalCode.toString();
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }


            // Check if the address belongs to the current user
            const addressDB = await prisma.shippingAddress.findMany({
                where: { userId: userId },
            });

            if (addressDB.length) {
                // Update all other addresses for this user to isDefault = false
                await prisma.shippingAddress.updateMany({
                    where: {
                        userId
                    },
                    data: { isDefault: false },
                });
            }


            // Create a new ShippingAddress
            const newAddress = await prisma.shippingAddress.create({
                data: {
                    firstName,
                    lastName,
                    phoneNumber,
                    landmarkArea,
                    region,
                    city,
                    address,
                    postalCode: postalCodeString,
                    streetAddress,
                    country,
                    deliveryLabel,
                    isDefault: true,
                    userId

                }
            });

            // Respond with the newly created address
            res.status(201).json(newAddress);
        } catch (error) {
            res.status(500).json({ error: "Failed to create shipping address" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
