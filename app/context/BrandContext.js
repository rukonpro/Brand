"use client"
import {createContext, useState} from 'react';

// Create the context
export const AppContext = createContext(null);

// Create a provider component
export const AppProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const providerValue={ cart, setCart,products,setProducts }
    return (

        <AppContext.Provider value={providerValue}>
            {children}
        </AppContext.Provider>

    );
};


