"use client"

import baseURL from '@/app/utils/baseURL';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { AiOutlineClose } from "react-icons/ai";
import io from 'socket.io-client';

const RemoveAddToCartButton = ({ itemId }) => {
    const [loading, setLoading] = useState(false);
    const { data: userData } = useSession();
    const user = userData?.user;

    // sokect io 
    const socket = io(baseURL, { path: '/api/socket' });

    const removeFromCart = (itemId) => {
        const userId = user?.id;
        setLoading(true)
        socket.emit('removeItem', { userId, itemId });

        socket.on('cartUpdated', (data) => {
            toast.success(data.message, {
                id: "cart",
                position: "bottom-center"
            });
            setLoading(false)
        });

        socket.on('cartError', (error) => {
            toast.error(error.message, {
                id: "cart",
                position: "bottom-center"
            })
            setLoading(false)
        });
    };

    return (
        <button
            onClick={() => removeFromCart(itemId)}
            type="button"
            disabled={loading}
            className={`rounded text-red-500 font-bold text-sm ${loading ? "opacity-20" : ""}`}
        >

            <AiOutlineClose size={25} />
        </button>
    );
};

export default RemoveAddToCartButton;