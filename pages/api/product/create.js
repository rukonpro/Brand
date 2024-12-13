// pages/api/products.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            name,
            description,
            basePrice,
            images,
            warranty,
            protection,
            specifications,
            tags,
            brandId,
            categoryId,
            variants,
        } = req.body;

        try {
            // Create a new product with relations
            const newProduct = await prisma.product.create({
                data: {
                    name,
                    description,
                    basePrice,
                    images,
                    warranty,
                    protection,
                    specifications,
                    tags,
                    brand: {
                        connect: { id: brandId }, // Connect to existing brand by ID
                    },
                    category: {
                        connect: { id: categoryId }, // Connect to existing category by ID
                    },
                    variants: {
                        create: variants.map((variant) => ({
                            price: variant.price,
                            stock: variant.stock,
                            sku: generateSKUAndVarcode(name, variant?.attributes).sku,
                            varcode: generateSKUAndVarcode(name, variant?.attributes).varcode,
                            availability: variant.availability,
                            images: variant.images,
                            attributes: {
                                create: variant.attributes.map((attribute) => ({
                                    name: attribute.name,
                                    value: attribute.value,
                                })),
                            },
                        })),
                    },
                },
                include: {
                    variants: {
                        include: {
                            attributes: true, // Include attributes in response
                        },
                    },
                    brand: true,
                    category: true,
                },
            });

            res.status(201).json({ message: 'Product created successfully', product: newProduct });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error creating product', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

function generateSKUAndVarcode(productName, attributes) {
    // Get the first three letters of the product name
    const namePart = productName.substring(0, 3).toUpperCase(); // Convert to uppercase

    // Generate unique suffix using timestamp and random number
    const uniqueSuffix =
        Date.now().toString().slice(-5) + Math.floor(Math.random() * 100).toString(); // Last 5 digits of timestamp + random number

    // Construct SKU and Varcode
    const sku = `SKU_${namePart}_${uniqueSuffix}`;
    const varcode = `VAR_${namePart}_${uniqueSuffix}`;

    return { sku, varcode };
}
