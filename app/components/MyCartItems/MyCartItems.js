import React from 'react';
import {products} from "@/app/components/RecommendedItems/RecommendedItems";
import MyCartItemCard from "@/app/components/MyCartItemCard/MyCartItemCard";
import BackButton from "@/app/components/BackButtons/BackButton";

const MyCartItems = () => {
    return (
        <ol className="col-span-12 md:col-span-8 lg:col-span-9  border-2 bg-white rounded-lg">
            {
                products.slice(0, 4).map((product, index) => {
                    return (
                        <li key={index}>
                            {/******************************My Cart Item Card*******************************/}
                            <MyCartItemCard product={product}/>
                        </li>
                    )
                })
            }

            <li className="py-5 px-3 flex justify-between">
                <BackButton title="Back"/>

                <button type="button"
                        className="bg-white border-2 text-blue-500 rounded-lg  px-3 py-1 hover:bg-gray-200"
                >Remove all
                </button>
            </li>
        </ol>
    );
};

export default MyCartItems;