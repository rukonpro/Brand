import React, { Suspense } from 'react';
import RecommendedItemsCard from './RecommendedItemsCard';
import Link from "next/link";
import { getProducts } from "@/app/utils/product/fetch_products_api";
import { SkeletonRecommendedItemCard } from "@/app/components/Skeletons/SkeletonRecommendedItemCard";



const RecommendedItems = async () => {

    const params = {
        limit: 10,
        page: 1
    }
    const products = await getProducts(params);


    return (
        <div className='pt-5 sm:px-3  '>
            <div className='max-w-[1200px] mx-auto md:border-2 pb-10 md:px-5 rounded-lg dark:border-slate-700 backdrop-blur-3xl'>
                <h1 className='text-2xl py-5 sm:px-0 px-4'>Recommended items</h1>
                <ul className='grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-0.5 '>
                    {
                        products?.data?.map((product, index) => {
                            return (
                                <li key={index} >
                                    <Link href={`/details/${product?.id}`}>
                                        <Suspense fallback={<SkeletonRecommendedItemCard />}>
                                            <RecommendedItemsCard product={product} />
                                        </Suspense>
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