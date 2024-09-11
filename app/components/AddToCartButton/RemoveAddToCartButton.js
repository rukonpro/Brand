"use client"
import React, {useContext} from 'react';
import {AppContext} from "@/app/context/BrandContext";
import Cookies from "js-cookie";
import Image from "next/image";
import RemoveIcon from "@/public/images/delete-trash-svgrepo-com.svg";

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
                className="border-2 rounded text-red-500 font-bold text-sm py-0.5 px-2"
        >

            <Image src={RemoveIcon} height={20} alt="remove icon"/>
        </button>
    );
};

export default RemoveAddToCartButton;