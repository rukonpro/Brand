"use client"

import React, {useContext} from 'react';
import Cookies from "js-cookie";
import {AppContext} from "@/app/context/BrandContext";

const RemoveAllAddToCartButton = () => {
    const {setCart,setProducts}=useContext(AppContext)
    // Function to remove all items from the cart
    const removeAllFromCart = () => {
        setCart([]);
        setProducts([])
        Cookies.remove('cart');  // Remove the 'cart' cookie
    };
    return (
        <button onClick={removeAllFromCart} type="button"
                className="bg-white border-2 text-blue-500 rounded-lg  px-3 py-1 hover:bg-gray-200"
        >Remove all
        </button>
    );
};

export default RemoveAllAddToCartButton;