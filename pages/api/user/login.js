import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token (adjust the secret and options as needed)
        const token = jwt.sign({
            userId: user.id,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            role:user.role,
        }, process.env.SECRET_KEY, { expiresIn: '10d' });

        return res.status(200).json({ token,user });
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
