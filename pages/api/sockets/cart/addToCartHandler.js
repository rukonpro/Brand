import { PrismaClient } from '@prisma/client';
import { getCartHandler } from './getCartHandler';

const prisma = new PrismaClient();

export const addToCartHandler = async (socket, data) => {
    const { productId, variantId, productName, price, quantity, selectedAttributes, userId } = data;

    try {

        // Check if the product is already in the cart for the same variant and user
        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                productId,
                variantId,
                userId,
            },
        });

        if (existingCartItem) {
            // Update quantity if the item already exists
            const updatedItem = await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: {
                    quantity: existingCartItem.quantity + quantity,
                },
            });
            socket.emit('cartUpdated', { message: 'Cart updated successfully', item: updatedItem });
        } else {
            // Create a new cart item
            const newItem = await prisma.cartItem.create({
                data: {
                    productId,
                    variantId,
                    productName,
                    price,
                    quantity,
                    selectedAttributes,
                    userId,
                },
            });
            socket.emit('cartUpdated', { message: 'Item added to cart successfully', item: newItem });

        }

        await getCartHandler(socket, { userId });
    } catch (error) {

        socket.emit('error', {
            message: 'Something went wrong while adding to the cart',
            details: error.message || error,
        });
    }
}

