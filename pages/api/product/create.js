// pages/api/products/create.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, description, photos, price, material, quantity, colors, sizes, rating, tags, availability, status, brandId, categoryId ,dimension} = req.body;

        try {
            const newProduct = await prisma.product.create({
                data: {
                    name,
                    description,
                    photos,
                    price,
                    material,
                    quantity,
                    colors,
                    sizes,
                    rating,
                    tags,
                    availability,
                    status,
                    brand: brandId ? { connect: { id: brandId } } : undefined,
                    category: categoryId ? { connect: { id: categoryId } } : undefined,
                    dimension: dimension
                        ? {
                            create: {
                                length: dimension.length,
                                width: dimension.width,
                                height: dimension.height,
                            },
                        }
                        : undefined,
                },
            });

            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'An error occurred while creating the product.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
