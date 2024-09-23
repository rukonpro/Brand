import React from 'react';
import Image from "next/image";


const RelatedProductCard = ({ product }) => {
    return (
        <div>
            <div className="h-52  overflow-hidden">
                <Image
                    src={product?.photos?.[0]}
                    alt={product?.name}
                    width={300}
                    height={300}
                    loading='lazy'
                    blurDataURL={product?.photos?.[0]}
                    className="w-full h-full object-cover"
                />
            </div>
            <h2 className="text-gray-600 text-sm pt-2 dark:text-slate-50">{product?.name}</h2>
            <p className="text-xl font-bold text-black pt-2 dark:text-slate-200">${product?.price}</p>
        </div>
    );
};

export default RelatedProductCard;