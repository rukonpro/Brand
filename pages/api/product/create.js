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
                            attributes: variant.attributes,
                            price: variant.price,
                            stock: variant.stock,
                            sku: generateSKUAndVarcode(name, variant?.attributes).sku,
                            varcode: generateSKUAndVarcode(name, variant?.attributes).varcode,
                            availability: variant.availability,
                            images: variant.images,

                        })),
                    },

                },
                include: {
                    variants: true,
                    brand: true,
                    category: true
                }
            });

            res.status(201).json({ message: 'Product created successfully', product: newProduct });
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}


function generateSKUAndVarcode(productName, attributes) {
    // Get the first three letters of the product name
    const namePart = productName.substring(0, 3).toUpperCase(); // Convert to uppercase

    // Create a string from attributes' keys and values
    const attributesPart = Object.entries(attributes)
        .map(([key, value]) => `${value}`)
        .join("_")
        .toUpperCase(); // Example: { color: 'red', size: 'large' } -> 'COLOR_RED_SIZE_LARGE'

    // Generate unique suffix using timestamp and random number
    const uniqueSuffix = Date.now().toString().slice(-5) + Math.floor(Math.random() * 100).toString(); // Last 5 digits of timestamp + random number

    // Construct SKU and Varcode
    const sku = `${namePart}_${attributesPart}_${uniqueSuffix}`;
    const varcode = `${namePart}VAR_${uniqueSuffix}`;

    return { sku, varcode };
}