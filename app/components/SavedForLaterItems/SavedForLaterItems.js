"use client"
import React, { Suspense, useEffect, useState } from 'react';
import SavedForLaterCard from "@/app/components/SavedForLaterCard/SavedForLaterCard";
import { getProducts } from "@/app/utils/product/fetch_products_api";
import empty_cart from "@/public/images/undraw_empty_cart_co35.svg"
import Image from 'next/image';
import useSWR from 'swr';
import { fetcher } from '@/app/utils/fetcher/fetcher';
import SavedForLaterSkeleton from '../Skeletons/SavedForLaterSkeleton';

const SavedForLaterItems = () => {
    const [products, setProducts] = useState([]);

    const productIds = products?.map(item => item.id).join(',');

    const params = {
        limit: 10,
        page: 1,
        productIds: productIds
    }

    const {
        data: saveProducts,
        error: errorSaveProduts,
        isLoading: isLoadingSaveProducts,
        mutate
    } = useSWR(`/api/product/findMany`, fetcher);



    return (
        <div className="mt-10">
            <Suspense fallback={<SavedForLaterSkeleton />} >

                {isLoadingSaveProducts ? <SavedForLaterSkeleton /> :
                    <div className="lg:bg-white md:p-3  md:rounded-r-lg dark:bg-slate-800">
                        <h1 className="text-xl font-bold text-gray-600 pb-5 px-3 md:px-0 dark:text-slate-200">Saved for later</h1>
                        <div>
                            {!isLoadingSaveProducts && saveProducts?.length > 0 ? <ol
                                className="grid grid-cols-2  sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-0.5 md:gap-1 lg:gap-2">
                                {
                                    saveProducts?.map((product) => {
                                        return (
                                            <li key={product?.id}>

                                                <SavedForLaterCard product={product} />

                                            </li>
                                        )
                                    })
                                }
                            </ol> :
                                <div className="h-56 flex justify-center items-center">
                                    <Image src={empty_cart} alt='empty_cart' height={300} width={300} />

                                </div>
                            }
                        </div>
                    </div>}
            </Suspense>
        </div>
    );
};

export default SavedForLaterItems;