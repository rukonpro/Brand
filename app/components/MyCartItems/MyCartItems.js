'use client'
import React from 'react';

import MyCartItemCard from "@/app/components/MyCartItemCard/MyCartItemCard";
import Loader from "@/app/Loader";
import RemoveAllAddToCartButton from "@/app/components/AddToCartButton/RemoveAllAddToCartButton";


const MyCartItems = ({ loading, cartItems, mutate }) => {

    return (
        <div className="col-span-12 md:col-span-12 lg:col-span-8 overflow-hidden sm:rounded-lg md:rounded-r-lg md:bg-white dark:bg-slate-800">
            {loading ?
                <div className="flex items-center justify-center w-full h-full">
                    <Loader />
                </div>
                :


                <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-0.5">
                    {
                        cartItems?.map((item) => {
                            return (
                                <li key={item?.id}>
                                    {/******************************My Cart Item Card*******************************/}
                                    <MyCartItemCard item={item} mutate={mutate}/>
                                </li>
                            )
                        })
                    }
                </ol>}
            {!loading && cartItems?.length ? <div className="py-5 px-3 flex justify-end">
                <RemoveAllAddToCartButton />
            </div> :
                <div className="flex items-center justify-center w-full h-full">
                    <h1 className=" text-red-500 font-bold text-2xl">Please add to Cart</h1>
                </div>
            }
        </div>
    );
};

export default MyCartItems;