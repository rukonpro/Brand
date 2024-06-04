import React from 'react';
import { products } from "@/app/components/RecommendedItems/RecommendedItems";
import SavedForLaterCard from "@/app/components/SavedForLaterCard/SavedForLaterCard";
import Link from "next/link";
import getProducts from '@/lib/product/getAllProducts';

const SavedForLaterItems = async () => {

    const { products } = await getProducts({});
    return (
        <div>
            <h1 className="text-xl font-bold text-gray-600 pb-5 px-3 md:px-0">Saved for later</h1>
            <div>
                <ol className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0.5 md:gap-1 lg:gap-2">
                    {
                        products?.map((product, index) => {
                            return (
                                <li key={index}>
                                    <Link href={`/details/${product?.name}`}>
                                        <SavedForLaterCard product={product} />
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    );
};

export default SavedForLaterItems;