import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'Token not provided' });
            }

            // Verify the token
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            // Fetch the user from the database
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json({ user });
        } catch (error) {
            console.error('Error fetching user:', error);
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
