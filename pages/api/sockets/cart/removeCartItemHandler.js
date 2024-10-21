import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const removeCartItemHandler = async (socket, data) => {
    const { userId, itemId } = data; // Expecting userId and itemId in the data payload

    try {
        // First, find the cart item to ensure it belongs to the user
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: itemId },
        });

        // Check if the cart item exists
        if (!cartItem) {
            socket.emit('cartError', { message: 'Item not found in cart' });
            return;
        }

        // Check if the deleted item belongs to the specified user
        if (cartItem.userId !== userId) {
            socket.emit('cartError', { message: 'You do not have permission to delete this item' });
            return;
        }

        // Delete the specific cart item for the user
        await prisma.cartItem.delete({
            where: { id: itemId },
        });

        socket.emit('cartUpdated', { userId, itemId });
        socket.emit('cartUpdated', { message: `${cartItem.productName} removed from cart successfully` });
    } catch (error) {
        socket.emit('cartError', { message: 'Something went wrong while deleting the item' });
    }
};

export default removeCartItemHandler;
