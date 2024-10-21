"use client"
import React, { Suspense } from 'react';

import MyCartItems from "@/app/components/MyCartItems/MyCartItems";
import CheckoutCard from "@/app/components/CheckoutCard/CheckoutCard";
import Link from "next/link";
import { useCart } from '@/app/context/CartContext';
import CheckoutSkeleton from '../Skeletons/CheckoutSkeleton';
import CartItemSkeleton from '../Skeletons/CartItemSkeleton';
import BackButton from '../BackButtons/BackButton';

const MyCartItemsLayout = () => {

    const { cart, mutate, isLoadingCart } = useCart()


    return (
        <>
            <div className="flex justify-between items-center pb-5 px-3 md:px-0">
                <h1 className="text-xl font-bold">My Cart ({cart?.cartItems?.length||"00"})</h1>
                <BackButton title="Back" />
            </div>

            <div className="grid grid-cols-12 gap-4">

                <Suspense fallback={<CartItemSkeleton />}>
                    <MyCartItems cartItems={cart?.cartItems} mutate={mutate} loading={isLoadingCart} />
                </Suspense>

                <div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 ">
                    <Suspense fallback={<CheckoutSkeleton />}>
                        <CheckoutCard
                            cartSummary={cart?.cartSummary}
                            loading={isLoadingCart}

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
                    </Suspense>
                </div>

            </div>
        </>
    );
};

export default MyCartItemsLayout;