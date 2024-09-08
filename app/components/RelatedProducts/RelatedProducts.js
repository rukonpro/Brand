import React, { Suspense } from 'react';
import Link from "next/link";
import RelatedProductCard from "@/app/components/RelatedProductCard/RelatedProductCard";

import AddToCartButton from '../AddToCartButton/AddToCartButton';
import axios from "axios";
import baseURL from "@/app/utils/baseURL";


const getProducts= async ({categoryId})=>{
    try {
        return await axios.get(`${baseURL}/api/product/findMany`,{
            params:{
                categoryId:categoryId
            }
        });
    }catch(error){
        console.log(error);
    }
}

const RelatedProducts = async ({ categoryId}) => {

   const products=await getProducts({categoryId});


    return (
        <div className="md:bg-white md:p-3 mt-10 md:rounded-lg border-2">
            <h1 className="text-xl font-bold text-gray-600 py-5 px-3 md:px-0">Related products</h1>
            <Suspense fallback={<h1>Loading...</h1>}>
                <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-0.5 md:gap-4">
                    {
                      products?.data?.map((product, index) => {
                            return (
                                <li key={index} className='bg-white md:border-2 border-blue-200 md:rounded-lg p-3 flex-1 flex flex-col justify-between'>
                                    <Link href={`/details/${product?.id}`}>

                                        {/************************Related products Card ***********************/}

                                        <RelatedProductCard product={product} />

                                    </Link>

                                    <AddToCartButton id={product?.id} />
                                </li>
                            )
                        })
                    }
                </ol>
            </Suspense>
        </div>
    );
};

export default RelatedProducts;