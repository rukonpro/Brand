import React from 'react';
import RecommendedItemsCard from './RecommendedItemsCard';
import Link from "next/link";
import {getProducts} from "@/app/utils/product/fetch_products_api";



const RecommendedItems = async () => {

    const params = {
        limit: 10,
        page: 1
    }
    const products = await getProducts(params);


    return (
        <div className='pt-5 sm:px-3 '>
            <div className='max-w-[1200px] mx-auto border-2 pb-10 px-5 rounded-lg dark:border-slate-700'>
                <h1 className='text-2xl py-5 sm:px-0 px-3'>Recommended items</h1>
                <ul className='grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-2 gap-1 '>
                    {
                        products?.data?.map((product, index) => {
                            return (
                                <li key={index} >
                                    <Link href={`/details/${product?.id}`}>
                                        <RecommendedItemsCard product={product} />
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default RecommendedItems;