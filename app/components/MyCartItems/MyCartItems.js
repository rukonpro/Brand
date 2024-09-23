'use client'
import React, {useCallback, useContext, useEffect, useState} from 'react';

import MyCartItemCard from "@/app/components/MyCartItemCard/MyCartItemCard";
import {AppContext} from "@/app/context/BrandContext";
import {getProducts} from "@/app/utils/product/fetch_products_api";
import Loading from "@/app/loading";
import RemoveAllAddToCartButton from "@/app/components/AddToCartButton/RemoveAllAddToCartButton";


const MyCartItems =  ({loading,products}) => {



    return (
        <div className="col-span-12 md:col-span-12 lg:col-span-8 overflow-hidden sm:rounded-lg md:rounded-r-lg md:bg-white dark:bg-slate-700">
            {loading?
                <div className="flex items-center justify-center w-full h-full">
                    <Loading/>
                </div>
                :


                <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-0.5">
                {
                    products?.map((product) => {
                        return (
                            <li key={product?.id}>
                                {/******************************My Cart Item Card*******************************/}
                                <MyCartItemCard product={product}/>
                            </li>
                        )
                    })
                }
            </ol>}
            {!loading && products?.length?<div className="py-5 px-3 flex justify-end">
                <RemoveAllAddToCartButton/>
            </div>:
                <div className="flex items-center justify-center w-full h-full">
                    <h1 className=" text-red-500 font-bold text-2xl">Please add to Cart</h1>
                </div>
            }
        </div>
    );
};

export default MyCartItems;