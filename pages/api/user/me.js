import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

// import {authorize} from "@/lib/auth/authorize";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {

        try {
            const session = await getSession({ req });
            if (!session) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // Fetch the user from the database
            const user = await prisma.user.findUnique({
                where: { email: session?.user?.email },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
