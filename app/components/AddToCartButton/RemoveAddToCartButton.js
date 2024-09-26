"use client"
import React, {useContext} from 'react';
import {AppContext} from "@/app/context/BrandContext";
import Cookies from "js-cookie";
import { AiOutlineClose } from "react-icons/ai";
const RemoveAddToCartButton = ({productId}) => {
const {cart,setCart,products,setProducts}=useContext(AppContext)

    // Function to completely remove the item from the cart
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.productId !== productId);
        const updateProducts=products?.filter((item) => item.id !== productId);
        setCart(updatedCart);
        setProducts(updateProducts);
        Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7, sameSite: 'Lax' });
    };

    return (
        <button
            onClick={()=>removeFromCart(productId)}
            type="button"
                className=" rounded text-red-500 font-bold text-sm "
        >

            <AiOutlineClose size={25}/>
        </button>
    );
};

export default RemoveAddToCartButton;