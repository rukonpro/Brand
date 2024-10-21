"use client"

import { useCart } from '@/app/context/CartContext';
import React from 'react';


import { AiOutlineClose } from "react-icons/ai";
const RemoveAddToCartButton = ({ itemId }) => {
    const { handleItemRemoveToCart, loadingRemoveToCartItem } = useCart()


    return (
        <button
            onClick={() => handleItemRemoveToCart({ itemId })}
            type="button"
            disabled={loadingRemoveToCartItem}
            className={`rounded text-red-500 font-bold text-sm ${loadingRemoveToCartItem ? "opacity-20" : ""}`}
        >

            <AiOutlineClose size={25} />
        </button>
    );
};

export default RemoveAddToCartButton;