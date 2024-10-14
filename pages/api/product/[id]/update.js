// pages/api/products/[id].js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;
 

    if (req.method === 'PATCH') {
        const {
            name,
            description,
            photos,
            price,
            material,
            quantity,
            warranty,
            protection,
            colors,
            sizes,
            rating,
            tags,
            availability,
            status,
            brandId,
            categoryId,
            discountPercentage,
            taxPercentage,
            deliveryFee,
            dimension,
        } = req.body;

        // Create a data object to store updates
        const updateData = {};

        // Only add fields that are provided in the request body
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (photos !== undefined) updateData.photos = photos;
        if (price !== undefined) updateData.price = price;
        if (material !== undefined) updateData.material = material;
        if (quantity !== undefined) updateData.quantity = quantity;
        if (warranty !== undefined) updateData.warranty = warranty;
        if (protection !== undefined) updateData.protection = protection;
        if (colors !== undefined) updateData.colors = colors;
        if (sizes !== undefined) updateData.sizes = sizes;
        if (rating !== undefined) updateData.rating = rating;
        if (tags !== undefined) updateData.tags = tags;
        if (availability !== undefined) updateData.availability = availability;
        if (status !== undefined) updateData.status = status;

        // Validate brandId and categoryId if provided
        if (brandId && !isValidObjectId(brandId)) {
            return res.status(400).json({ error: 'Invalid brandId format' });
        }
        if (brandId !== undefined) updateData.brandId = brandId;
        if (categoryId && !isValidObjectId(categoryId)) {
            return res.status(400).json({ error: 'Invalid categoryId format' });
        }
        if (categoryId !== undefined) updateData.categoryId = categoryId;
        // Add optional fields to updateData only if they are provided
        if (discountPercentage !== undefined) updateData.discountPercentage = discountPercentage;
        if (taxPercentage !== undefined) updateData.taxPercentage = taxPercentage;
        if (deliveryFee !== undefined) updateData.deliveryFee = deliveryFee;
        if (dimension !== undefined) updateData.dimension = dimension;

        try {
            const updatedProduct = await prisma.product.update({
                where: { id },
                data: updateData,
            });
            return res.status(200).json(updatedProduct);
        } catch (error) {
          
            if (error.code === 'P2023') {
                return res.status(400).json({ error: 'Malformed ObjectID: Please check your IDs.' });
            }
    
            return res.status(500).json({ error: 'Failed to update product' });
        }
    } else {
        // Handle any other HTTP method
        return res.setHeader('Allow', ['PATCH']).status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// Helper function to check for valid ObjectID format
function isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
}
