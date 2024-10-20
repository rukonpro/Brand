"use client"
import React from 'react';

import MyCartItems from "@/app/components/MyCartItems/MyCartItems";
import CheckoutCard from "@/app/components/CheckoutCard/CheckoutCard";
import Link from "next/link";
import { fetcher } from '@/app/utils/fetcher/fetcher';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

const MyCartItemsLayout = () => {

    const { data: userData } = useSession();
    const user = userData?.user;

    const {
        data: cart,
        error: errorCartItems,
        isLoading: isLoadingCartItems,
        mutate
    } = useSWR(`/api/cart/${user?.id}/getCart`, fetcher);


    return (
        <>
            <MyCartItems cartItems={cart?.cartItems} mutate={mutate} loading={isLoadingCartItems} />

            <div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 ">
                <CheckoutCard
                    cartSummary={cart?.cartSummary}
                    loading={isLoadingCartItems}

                >

                    <div className="pt-8">
                        {cart?.cartItems?.length !== 0 ?
                            <Link href="/checkout"
                                type="button"
                                className={`text-xl ${cart?.cartItems?.length === 0 ? "bg-green-200 text-slate-700" : "bg-green-500 text-white"} px-5 py-2 rounded-lg w-full inline-block text-center items-center`}
                            >Checkout
                            </Link> :
                            <button type="button"
                                disabled
                                className={`text-xl ${cart?.cartItems?.length === 0 ? "bg-green-200 text-slate-700 cursor-not-allowed" : "bg-green-500 text-white"}e px-5 py-2 rounded-lg w-full inline-block text-center items-center`}
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