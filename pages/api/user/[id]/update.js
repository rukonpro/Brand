import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    // Handle only PATCH requests
    if (method === 'PATCH') {
        try {
            const updates = req.body;

            // Optional: Hash password if provided
            if (updates.password) {
                const saltRounds = 10;
                updates.password = await bcrypt.hash(updates.password, saltRounds);
            }

            // Update user data in the database
            const updatedUser = await prisma.user.update({
                where: { id },
                data: updates,
            });

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ error: 'An error occurred while updating the user' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
