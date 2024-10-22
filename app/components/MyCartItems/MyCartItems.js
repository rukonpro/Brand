'use client'
import React from 'react';
import MyCartItemCard from "@/app/components/MyCartItemCard/MyCartItemCard";
import RemoveAllAddToCartButton from "@/app/components/AddToCartButton/RemoveAllAddToCartButton";


const MyCartItems = ({ loading, cartItems, mutate }) => {

    return (
        <>
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
            </ol>

            {!loading && cartItems?.length &&
                <div className="py-5 px-3 flex justify-end">
                    <RemoveAllAddToCartButton />
                </div>

            }
        </>
    );
};

export default MyCartItems;