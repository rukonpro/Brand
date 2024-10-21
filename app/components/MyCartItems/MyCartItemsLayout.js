"use client"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'; // Import the Socket.io client

import MyCartItems from "@/app/components/MyCartItems/MyCartItems";
import CheckoutCard from "@/app/components/CheckoutCard/CheckoutCard";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import baseURL from '@/app/utils/baseURL';

const MyCartItemsLayout = () => {
    const [cartData, setCartData] = useState({
        cartItems: [],
        cartSummary: {}
    }); // State to hold the cart data
    const [loading, setLoading] = useState(true);

    const { data: userData } = useSession();
    const user = userData?.user;



    // socket io--------------------------


    useEffect(() => {
        // Connect to the Socket.io server
        const socket = io(baseURL, {
            path: '/api/socket',
        });

        // Emit an event to get the cart data
        setLoading(true); // Start loading
        const userId = user?.id; // Replace with the logged-in user's ID
        socket.emit('getCart', { userId });

        // Listen for the cart response
        socket.on('cartResponse', (data) => {
            setCartData(data); // Set the cart data to the state
            setLoading(false); // Stop loading
        });

        // Listen for cart updates
        socket.on('cartUpdated', (update) => {

            // Handle the update by re-fetching the cart or updating the state directly
            {
                update?.userId === userId && setCartData(prevCartData => {
                    return {
                        ...prevCartData,
                        cartItems: prevCartData?.cartItems?.filter(item => item?.id !== update?.itemId)
                    }
                });
            }

        });


        // Listen for any errors
        socket.on('cartError', (error) => {
            // Set the error message

            toast.error(error.message, {
                id: "cart"
            })
            setLoading(false); // Stop loading
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, [user?.id]);



    return (
        <>
            <MyCartItems cartItems={cartData?.cartItems} loading={loading} />

            <div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 ">
                <CheckoutCard
                    cartSummary={cartData?.cartSummary}
                    loading={loading}

                >

                    <div className="pt-8">
                        {cartData?.cartItems?.length !== 0 ?
                            <Link href="/checkout"
                                type="button"
                                className={`text-xl ${cartData?.cartItems?.length === 0 ? "bg-green-200 text-slate-700" : "bg-green-500 text-white"} px-5 py-2 rounded-lg w-full inline-block text-center items-center`}
                            >Checkout
                            </Link> :
                            <button type="button"
                                disabled
                                className={`text-xl ${cartData?.cartItems?.length === 0 ? "bg-green-200 text-slate-700 cursor-not-allowed" : "bg-green-500 text-white"}e px-5 py-2 rounded-lg w-full inline-block text-center items-center`}
                            >
                                Checkout
                            </button>
                        }
                    </div>
                </CheckoutCard>
            </div>

        </>
    );
};

export default MyCartItemsLayout;