import { Server } from 'socket.io';
import { getCartHandler } from './sockets/cart/getCartHandler';
import baseURL from '@/app/utils/baseURL';
import removeCartItemHandler from './sockets/cart/removeCartItemHandler';
import { addToCartHandler } from './sockets/cart/addToCartHandler';





let io;

const socketHandler = (req, res) => {
    if (!io) {
        io = new Server(res.socket.server, {
            path: '/api/socket',
            cors: {
                origin: baseURL, // This can be updated to a specific domain in production
                methods: ['GET', 'POST', 'DELETE', "PATCH"],
                credentials: true
            },
        });

        io.on('connection', (socket) => {
            console.log('New client connected');

            // Attach the getCartHandler

            socket.on('getCart', async (data) => {
                await getCartHandler(socket, data);
            });

            socket.on('removeItem', async (data) => {
                await removeCartItemHandler(socket, data);
            });

            socket.on('addToCart', async (data) => {
                await addToCartHandler(socket, data);
            })

        });

        res.socket.server.io = io;
        console.log('Socket.io server started');
    } else {
        console.log('Socket.io server already running');
    }

    res.end();
};

export default socketHandler;
