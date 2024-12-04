// pages/api/products/delete.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        try {
            // Validate the request body
            if (!id) {
                return res.status(400).json({ message: 'Product ID is required.' });
            }

            // Fetch the product to check if it exists
            const product = await prisma.product.findUnique({
                where: { id: id },
                include: { variants: true }, // Include variants to ensure they exist
            });

            if (!product) {
                return res.status(404).json({ message: 'Product not found.' });
            }

            // Delete related variants
            await prisma.variant.deleteMany({
                where: { productId: id },
            });

            // Delete the product
            const deletedProduct = await prisma.product.delete({
                where: { id: id },
            });

            res.status(200).json({
                message: 'Product deleted successfully',
                product: deletedProduct,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
