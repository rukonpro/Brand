"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import baseURL from '@/app/utils/baseURL';
import io from 'socket.io-client';


const NavCart = () => {
    const [cartCount, setCartCount] = useState(0);


    const { data: userData } = useSession();
    const user = userData?.user;


    useEffect(() => {
        // Connect to the Socket.io server
        const socket = io(baseURL, {
            path: '/api/socket',
        });

        // Emit an event to get the cart data

        const userId = user?.id; // Replace with the logged-in user's ID
        socket.emit('getCart', { userId });

        // Listen for the cart response
        socket.on('cartResponse', (cartData) => {
            console.log(cartData)
            setCartCount(cartData?.cartSummary?.totalItems);
        });


        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, [user?.id]);


    return (
        <span className="relative flex h-7 w-7">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span
                className="relative inline-flex rounded-full h-7 w-7 bg-sky-500 text-xs  justify-center items-center text-white font-bold">{cartCount}</span>

        </span>)

};

export default NavCart;