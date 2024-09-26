import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            // Find if the offer exists
            const product = await prisma.product.findUnique({
                where: {
                    id: id,
                },
            });

            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }

            // Delete the offer
            await prisma.product.delete({
                where: {
                    id: id,
                },
            });

            res.status(200).json({ success: true, message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ success: false, message: 'Failed to delete product' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
