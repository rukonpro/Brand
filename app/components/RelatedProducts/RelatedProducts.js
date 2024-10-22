import React, { Suspense } from 'react';
import Link from "next/link";
import { getProducts } from "@/app/utils/product/fetch_products_api";
import RecommendedItemsCard from '../RecommendedItems/RecommendedItemsCard';
import { SkeletonRecommendedItemCard } from '../Skeletons/SkeletonRecommendedItemCard';



const RelatedProducts = async ({ categoryId }) => {

    const params = {
        limit: 10,
        page: 1,
        categoryId: categoryId
    }
    const products = await getProducts(params);




    return (


        <div>
            <h1 className="text-xl font-bold text-gray-600 py-5 px-3 md:px-0 dark:text-slate-50">Related products</h1>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0.5 md:gap-4">
                {
                    products?.data?.map((product, index) => {
                        return (
                            <li key={index} >
                                <Suspense fallback={<SkeletonRecommendedItemCard />}>
                                    <Link href={`/details/${product?.id}`}>

                                        {/************************Related products Card ***********************/}

                                        <RecommendedItemsCard product={product} />

                                    </Link>
                                </Suspense>
                            </li>
                        )
                    })
                }
            </ul>
        </div>



    );
};

export default RelatedProducts;