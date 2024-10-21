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
                className="border-2  rounded-lg  px-3 py-1 border-blue-500 text-blue-500  dark:bg-inherit"
        >Remove all
        </button>
    );
};

export default RemoveAllAddToCartButton;