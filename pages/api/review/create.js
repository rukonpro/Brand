import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { getSession } from 'next-auth/react'; // Assuming NextAuth for authentication

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const session = await getSession({ req });
        const userId = session?.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { productId, rating, comment, images } = req.body;

        if (!productId || !rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Invalid input' });
        }

        try {
            const newReview = await prisma.review.create({
                data: {
                    product: { connect: { id: productId } },
                    user: { connect: { id: userId } },
                    rating,
                    comment,
                    images: images || [],
                },
                include: {
                    user: { select: { id: true, firstName: true, lastName: true } },
                    product: { select: { id: true, name: true } },
                },
            });

            res.status(201).json({ message: 'Review created successfully', review: newReview });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error creating review', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}