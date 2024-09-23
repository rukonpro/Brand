import React, { Suspense } from 'react';
import Link from "next/link";
import RelatedProductCard from "@/app/components/RelatedProductCard/RelatedProductCard";
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import {getProducts} from "@/app/utils/product/fetch_products_api";


const RelatedProducts = async ({ categoryId}) => {

    const params = {
        limit: 10,
        page: 1,
        categoryId:categoryId
    }
    const products = await getProducts(params);




    return (
        <div className="md:bg-white md:p-3 mt-10 md:rounded-lg border-2 dark:bg-slate-700 dark:border-slate-500">
            <h1 className="text-xl font-bold text-gray-600 py-5 px-3 md:px-0 dark:text-slate-50">Related products</h1>
            <Suspense fallback={<h1>Loading...</h1>}>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-0.5 md:gap-4">
                    {
                      products?.data?.map((product, index) => {
                            return (
                                <li key={index} className='bg-white dark:bg-slate-600 dark:border-slate-500 md:border-2 border-blue-200 md:rounded-lg p-3 flex-1 flex flex-col justify-between'>
                                    <Link href={`/details/${product?.id}`}>

                                        {/************************Related products Card ***********************/}

                                        <RelatedProductCard product={product} />

                                    </Link>

                                    <AddToCartButton product={product} />
                                </li>
                            )
                        })
                    }
                </ul>
            </Suspense>
        </div>
    );
};

export default RelatedProducts;