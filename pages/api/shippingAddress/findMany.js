import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { method } = req;

    if (method === 'GET') {
        try {
            // Extract userId, page, and limit from the query string
            const { userId, page = 1, limit = 10 } = req.query;

            // Validate userId
            if (!userId) {
                return res.status(400).json({ error: "User ID is required" });
            }

            // Convert page and limit to integers
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);

            // Calculate the offset (how many records to skip)
            const skip = (pageNum - 1) * limitNum;

            // Fetch shipping addresses for the user with pagination
            const addresses = await prisma.shippingAddress.findMany({
                where: {
                    userId,
                },
                skip,
                take: limitNum, // Limit the number of addresses returned
            });

            // Get the total number of addresses for this user
            const totalAddresses = await prisma.shippingAddress.count({
                where: { userId },
            });

            // Return the addresses and pagination info
            res.status(200).json({
                addresses,
                meta: {
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
