import React from 'react';
import Image from 'next/image';
const SourceProductCard = ({ product }) => {
    return (
        <div className='grid grid-cols-8 p-2 bg-white rounded relative'>
            {product?.offers[0]?.discountValue&&
                <span
                className="absolute top-1 right-1 bg-green-200 rounded-full text-red-500 px-1 py-0 text-xs">{product?.offers[0]?.discountValue}%Dis</span>
            }
            <div className='col-span-5'>

                <h1 className="text-lg">{product?.name}</h1>
                <p className="text-gray-600 pt-2">USD ${product.price}</p>
            </div>
            <div className='col-span-3 flex items-end'>
                <Image
                    src={product?.photos?.[0]}
                    height={100}
                    width={100}
                    loading="eager"
                    alt={product.name}
                    blurDataURL={product?.photos?.[0]}
                    className=" w-full object-cover"
                />
            </div>
        </div>
    );
};

export default SourceProductCard;