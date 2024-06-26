import React from 'react';

import MyCartItemCard from "@/app/components/MyCartItemCard/MyCartItemCard";
import BackButton from "@/app/components/BackButtons/BackButton";
import getProducts from '@/lib/product/getAllProducts';

const MyCartItems = async () => {
    const { products } = await getProducts({});
    return (
        <div className="col-span-12 md:col-span-12 lg:col-span-8 overflow-hidden sm:rounded-lg md:rounded-r-lg md:bg-white ">
            <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-0.5">
                {
                    products?.map((product, index) => {
                        return (
                            <li key={index}>
                                {/******************************My Cart Item Card*******************************/}
                                <MyCartItemCard product={product} />
                            </li>
                        )
                    })
                }


            </ol>
            <div className="py-5 px-3 flex justify-between">
                <BackButton title="Back" />

                <button type="button"
                    className="bg-white border-2 text-blue-500 rounded-lg  px-3 py-1 hover:bg-gray-200"
                >Remove all
                </button>
            </div>
        </div>
    );
};

export default MyCartItems;