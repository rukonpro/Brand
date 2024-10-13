import React from 'react';
import Image from "next/image";


const RelatedProductCard = ({ product }) => {
    return (
        <div>
            <div className="flex justify-center items-center">
                <Image
                    src={product?.photos?.[0]}
                    alt={product?.name}
                    width={112}
                    height={112}
                    loading='lazy'
                    blurDataURL={product?.photos?.[0]}
                    className="object-contain h-28 w-auto "
                />
            </div>
            <div>
                <h2 className="text-gray-600 text-sm pt-2 dark:text-slate-50 truncate">{product?.name}</h2>
                <p className="text-xl font-bold text-black pt-2 dark:text-slate-200">${product?.price}</p>
            </div>
        </div>
    );
};

export default RelatedProductCard;