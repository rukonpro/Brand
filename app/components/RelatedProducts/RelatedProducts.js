import React from 'react';
import {products} from "@/app/components/RecommendedItems/RecommendedItems";
import Link from "next/link";
import RelatedProductCard from "@/app/components/RelatedProductCard/RelatedProductCard";

const RelatedProducts = () => {
    return (
        <div className="bg-white p-3 mt-10 rounded-lg border-2">
            <h1 className="text-xl font-bold text-gray-600 pb-5">Related products</h1>
            <div>
                <ol className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        products.slice(0, 4).map((product, index) => {
                            return (
                                <li key={index}>
                                    <Link href={`/details/${product.title + index}`}>

                                        {/************************Related products Card ***********************/}

                                        <RelatedProductCard product={product}/>
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

export default RelatedProducts;