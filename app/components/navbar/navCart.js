"use client"
import React from 'react';

import { useCart } from '@/app/context/CartContext';



const NavCart = () => {
    const { cart } = useCart()




    return cart?.cartItems ?
        <span className="relative flex h-7 w-7">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span
                className="relative inline-flex rounded-full h-7 w-7 bg-sky-500 text-xs  justify-center items-center text-white font-bold">{cart?.cartItems?.length}</span>

        </span>
        : null
};

export default NavCart;