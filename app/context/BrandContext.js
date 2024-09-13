"use client"

import {createContext, useEffect, useState} from 'react';
import getMe from "@/app/utils/user/me";

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            const me=await getMe();
            setUser(me?.user);
        }
        fetchProducts();
    },[])



    return (
        <AppContext.Provider value={{ cart, setCart,products,setProducts,user,setUser }}>
            {children}
        </AppContext.Provider>
    );
};


