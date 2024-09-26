// pages/api/products/[id].js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "PATCH") {
        try {
            const dataToUpdate = req.body; // The incoming data from the request body
            const updatedProduct = await prisma.product.update({
                where: { id: id },
                data: dataToUpdate,  // Update product with the fields from the request body
            });

            return res.status(200).json(updatedProduct);
        } catch (error) {
            console.error("Error updating product:", error);
            return res.status(500).json({ error: "Failed to update product" });
        }
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
