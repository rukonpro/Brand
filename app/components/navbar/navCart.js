"use client"
import React, {useContext,useEffect} from 'react';
import {AppContext} from "@/app/context/BrandContext";
import Cookies from "js-cookie";



const NavCart = () => {
    const { cart, setCart } = useContext(AppContext);

    // Load cart data from cookies on component mount
    useEffect(() => {
        const storedCart = Cookies.get('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, [setCart]);



    return cart?.length ?
        <span className="relative flex h-7 w-7">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span
            className="relative inline-flex rounded-full h-7 w-7 bg-sky-500 text-xs  justify-center items-center text-white font-bold">{cart?.length}</span>

            </span>
            :null
            };

export default NavCart;