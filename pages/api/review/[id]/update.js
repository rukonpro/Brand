import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { getSession } from 'next-auth/react'; // Assuming NextAuth for authentication

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        const { reviewId } = req.query;

        if (!reviewId) {
            return res.status(400).json({ message: 'Review ID is required' });
        }

        const session = await getSession({ req });
        const userId = session?.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { rating, comment, images } = req.body;

        // Validate rating if provided
        if (rating !== undefined && (rating < 1 || rating > 5)) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        try {
            const existingReview = await prisma.review.findUnique({
                where: { id: reviewId },
            });

            if (!existingReview) {
                return res.status(404).json({ message: 'Review not found' });
            }

            if (existingReview.userId !== userId) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const updatedReview = await prisma.review.update({
                where: { id: reviewId },
                data: {
                    rating: rating !== undefined ? rating : existingReview.rating,
                    comment: comment !== undefined ? comment : existingReview.comment,
                    images: images !== undefined ? images : existingReview.images,
                    updatedAt: new Date(),
                },
                include: {
                    user: { select: { id: true, firstName: true, lastName: true } },
                    product: { select: { id: true, name: true } },
                },
            });

            res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error updating review', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}