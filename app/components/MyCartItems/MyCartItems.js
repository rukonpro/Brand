'use client'
import React from 'react';
import MyCartItemCard from "@/app/components/MyCartItemCard/MyCartItemCard";
import RemoveAllAddToCartButton from "@/app/components/AddToCartButton/RemoveAllAddToCartButton";
import CartItemSkeleton from '../Skeletons/CartItemSkeleton';
import cta3 from "@/public/images/cta3.svg"
import Image from 'next/image';

const MyCartItems = ({ loading, cartItems, mutate }) => {

    return (
        <div className="col-span-12 md:col-span-12 lg:col-span-8 overflow-hidden sm:rounded-lg md:rounded-r-lg md:bg-white dark:bg-slate-800">
            {loading ? <CartItemSkeleton /> :

                <ol className="grid grid-cols-1 gap-0.5">
                    {
                        cartItems?.map((item) => {
                            return (
                                <li key={item?.id}>
                                    {/******************************My Cart Item Card*******************************/}
                                    <MyCartItemCard item={item} mutate={mutate} />
                                </li>
                            )
                        })
                    }
                </ol>}
            {!loading && cartItems?.length ?
                <div className="py-5 px-3 flex justify-end">
                    <RemoveAllAddToCartButton />
                </div> :
                <div className="flex items-center justify-center w-full h-full relative">
                    <Image src={cta3} alt="Cta" width={300} height={300} className='w-full h-full'/>
                    <h1 className=" text-blue-500 font-bold text-2xl absolute top-5">Please add to Cart</h1>
                </div>
            }
        </div>
    );
};

export default MyCartItems;