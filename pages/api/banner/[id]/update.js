import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'PATCH') {
        // Extract the updated data from the request body
        const { image, title, link, status, startDate, endDate } = req.body;

        // Build the data object to be updated
        const updateData = {};
        if (image !== undefined) updateData.image = image;
        if (title !== undefined) updateData.title = title;
        if (link !== undefined) updateData.link = link;
        if (status !== undefined) updateData.status = status;
        if (startDate !== undefined) updateData.startDate = new Date(startDate);
        if (endDate !== undefined) updateData.endDate = new Date(endDate);

        try {
            // Update the banner with the provided fields
            const updatedBanner = await prisma.banner.update({
                where: { id: id },
                data: updateData,
            });

            res.status(200).json({ message: 'Banner updated successfully', banner: updatedBanner });
        } catch (error) {
            if (error.code === 'P2025') { // Prisma error code for "Record to update not found"
                res.status(404).json({ error: 'Banner not found' });
            } else {
                res.status(500).json({ error: 'Error updating banner' });
            }
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}