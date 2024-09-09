import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;
    const { description, discountType, discountValue, startDate, endDate } = req.body;

    if (req.method === 'POST') {
        try {
            const offer = await prisma.offer.create({
                data: {
                    description,
                    discountType,
                    discountValue,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    product: { connect: { id } },  // Connects the offer to the product
                },
            });

            res.status(201).json({ success: true, offer });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Failed to create offer.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
