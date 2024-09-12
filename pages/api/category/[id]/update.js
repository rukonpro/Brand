import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        const { id } = req.query;
        const { name, photo, description, parentId } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Category ID is required' });
        }

        // Build the update data object
        const updateData = {};
        if (name) updateData.name = name;
        if (photo) updateData.photo = photo;
        if (description !== undefined) updateData.description = description;
        if (parentId !== undefined) updateData.parentId = parentId || null; // Handle null values

        try {
            const updatedCategory = await prisma.category.update({
                where: {
                    id,
                },
                data: updateData,
            });

            res.status(200).json(updatedCategory);
        } catch (error) {
            console.error('Error updating category:', error.message);
            res.status(500).json({ error: 'Failed to update category' });
        }
    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
