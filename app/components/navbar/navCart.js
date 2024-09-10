"use client"
import React, {useContext} from 'react';
import {AppContext} from "@/app/context/BrandContext";



const NavCart = () => {
    const {cart} = useContext(AppContext);
    return cart?.length ? <span
        className="relative inline-flex rounded-full h-7 w-7 bg-sky-500 text-xs  justify-center items-center text-white font-bold">{cart?.length}</span>:null
};

export default NavCart;