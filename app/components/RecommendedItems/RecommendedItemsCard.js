import React from 'react';
import Image from 'next/image';
const RecommendedItemsCard = ({ product }) => {
    return (
        <div className='p-5 sm:border-2 sm:rounded-lg bg-white'>
            <div className='flex justify-center'>
                <Image
                    src={product?.images?.[0]}
                    height={300}
                    width={300}
                    blurDataURL={product?.images?.[0]}
                    loading='lazy'
                    placeholder='blur'
                    className=" w-auto h-28 object-fill"
                    alt={product?.name} />
            </div>
            <h1 className='text-lg pt-5 font-bold'>${product?.price}</h1>
            <p className="text-gray-500 pt-1 truncate hover:text-clip">{product?.name}</p>
        </div>
    );
};

export default RecommendedItemsCard;