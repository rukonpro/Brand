// pages/api/products.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


function generateSKU(productName, color, size) {
    return `SKU-${productName.substring(0, 3).toUpperCase()}-${color}-${size}`;
}

function generateBarcode() {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();  // Random 12-digit barcode
}



export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            name,
            description,
            coverPhoto,
            basePrice,
            totalStock,
            warranty,
            protection,
            tags,
            availability,
            status,
            brandId,
            categoryId,
            taxPercentage,
            deliveryFee,
            variants,
            specifications // Expecting an array of variant objects
        } = req.body;

        try {
            // Create the product
            const newProduct = await prisma.product.create({
                data: {
                    name,
                    description,
                    coverPhoto,
                    basePrice,
                    totalStock,
                    warranty,
                    protection,
                    tags,
                    availability,
                    status,
                    brand: { connect: { id: brandId } },
                    category: { connect: { id: categoryId } },
                    taxPercentage,
                    deliveryFee,
                    specifications,
                    variants: {
                        create: variants.map(variant => ({
                            attributes: variant.attributes,
                            image: variant?.image,
                            options: {
                                create: variant.options.map(option => ({
                                    attributes: option.attributes,
                                    price: option.price,
                                    stock: option.stock,
                                })),

                            },

                        })),
                    },
                },
                include: {
                    variants: {
                        include: {
                            options: true
                        }
                    },
                    brand: true,
                    category: true
                }
            });

            res.status(201).json(newProduct);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Failed to create product' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
