import { PrismaClient } from '@prisma/client';
import {getSession} from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { method } = req;

    if (method === 'GET') {

        const session = await getSession({ req });
     
        if (!session) {
            return res.status(401).json({ message: 'Unauthorized' });
        }


        try {
            // Extract userId, page, and limit from the query string
            const { page = 1, limit = 10 } = req.query;
            // Validate userId

            // Convert page and limit to integers
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);

            // Calculate the offset (how many records to skip)
            const skip = (pageNum - 1) * limitNum;

            // Fetch shipping addresses for the user with pagination
            const addresses = await prisma.shippingAddress.findMany({
                where: {
                    userId:session?.user?.id,
                },
                skip,
                take: limitNum, // Limit the number of addresses returned
            });

            // Get the total number of addresses for this user
            const totalAddresses = await prisma.shippingAddress.count({
                where: { userId:session?.user?.id },
            });

            // Return the addresses and pagination info
            res.status(200).json({
                addresses,
                pagination: {
                    total: totalAddresses,
                    page: pageNum,
                    limit: limitNum,
                    totalPages: Math.ceil(totalAddresses / limitNum),
                },
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve shipping addresses" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
