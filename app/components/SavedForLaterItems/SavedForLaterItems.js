import React from 'react';
import {products} from "@/app/components/RecommendedItems/RecommendedItems";
import SavedForLaterCard from "@/app/components/SavedForLaterCard/SavedForLaterCard";
import Link from "next/link";

const SavedForLaterItems = () => {
    return (
        <div>
            <h1 className="text-xl font-bold text-gray-600 pb-5">Saved for later</h1>
            <div>
                <ol className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        products.slice(0, 4).map((product, index) => {
                            return (
                                <li key={index}>
                                    <Link href={`/details/${product.title}`}>
                                        <SavedForLaterCard product={product}/>
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