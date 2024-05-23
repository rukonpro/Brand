import React from 'react';
import Image from 'next/image';
const SourceProductCard = ({ product }) => {
    return (
        <div className='grid grid-cols-8 p-2'>
            <div className='col-span-5'>
                <h1 className="text-lg">{product?.name}</h1>
                <p className="text-gray-600 pt-2">USD ${product.price}</p>
            </div>
            <div className='col-span-3 flex items-end'>
                <Image
                    src={product?.images?.[0]}
                    height={100}
                    width={100}
                    alt={product.name}
                    loading='lazy'
                    blurDataURL={product?.images?.[0]}
                    className=" w-full object-cover"
                />
            </div>
        </div>
    );
};

export default SourceProductCard;