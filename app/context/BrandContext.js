"use client"
import {createContext, useEffect, useState} from 'react';
import { useSession } from 'next-auth/react';
import getMe from "@/app/utils/user/me";
import Loading from "@/app/loading";

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});

    const { data: session, status } = useSession();


    useEffect(() => {
        const fetchProducts = async () => {
            const me=await getMe();
            setUser(me?.user);
        }
        fetchProducts()

    },[session])

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-screen w-screen overflow-hidden">
                <Loading/>
            </div>
        );
    }

    const providerValue={ cart, setCart,products,setProducts,user,setUser }
    return (

        <AppContext.Provider value={providerValue}>
            {children}
        </AppContext.Provider>

    );
};


