import React from 'react';
import Image from "next/image";


const RelatedProductCard = ({ product }) => {
    return (
        <div>
            <div>
                <Image
                    src={product.images?.[0]}
                    alt={product?.name}
                    width={300}
                    height={300}
                    loading='lazy'
                    blurDataURL={product.images?.[0]}
                    className="w-full h-52 object-contain overflow-hidden"
                />
            </div>
            <h2 className="text-gray-600 text-sm pt-2">{product?.name}</h2>
            <p className="text-xl font-bold text-black pt-2">${product?.price}</p>
        </div>
    );
};

export default RelatedProductCard;