import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {



    if (req.method === 'POST') {

        try {
            const {
                firstName,
                lastName,
                phoneNumber,
                houseNumber,
                street,
                city,
                postalCode,
                state,
                country,
                userId
            } = req.body;

           const postalCodeString=postalCode.toString()

            // Create a new ShippingAddress
            const newAddress = await prisma.shippingAddress.create({
                data:{
                    firstName,
                    lastName,
                    phoneNumber,
                    houseNumber,
                    street,
                    city,
                    postalCode:postalCodeString,
                    state,
                    country,
                    isDefault:false,
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
