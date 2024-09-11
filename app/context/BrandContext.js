"use client"

import {createContext, useState} from 'react';

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);

    return (
        <AppContext.Provider value={{ cart, setCart,products,setProducts }}>
            {children}
        </AppContext.Provider>
    );
};


