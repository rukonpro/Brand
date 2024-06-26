import React from 'react';
import Link from "next/link";
import RelatedProductCard from "@/app/components/RelatedProductCard/RelatedProductCard";

import AddToCartButton from '../AddToCartButton/AddToCartButton';
import getProducts from '@/lib/product/getAllProducts';

const RelatedProducts = async ({ id }) => {
    const searchParams = {
        category:  id
    };

    const { products } = await getProducts(searchParams);

    
    return (
        <div className="md:bg-white md:p-3 mt-10 md:rounded-lg border-2">
            <h1 className="text-xl font-bold text-gray-600 py-5 px-3 md:px-0">Related products</h1>
            <div>
                <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-0.5 md:gap-4">
                    {
                        products?.map((product, index) => {
                            return (
                                <li key={index} className='bg-white md:border-2 border-blue-200 md:rounded-lg p-3 flex-1 flex flex-col justify-between'>
                                    <Link href={`/details/${product?._id}`}>

                                        {/************************Related products Card ***********************/}

                                        <RelatedProductCard product={product} />

                                    </Link>

                                    <AddToCartButton id={product?._id} />
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    );
};

export default RelatedProducts;