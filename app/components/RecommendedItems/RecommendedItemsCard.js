import React from 'react';
import Image from 'next/image';
const RecommendedItemsCard = ({ product }) => {

    return (
        <div className='md:p-5 p-2 sm:border-2 sm:rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700'>
            <div className='flex justify-center'>
                {product?.images?.[0] && <Image
                    src={product?.images?.[0]}
                    height={300}
                    width={300}
                    blurDataURL={product?.images?.[0]}
                    loading='lazy'
                    placeholder='blur'
                    className=" w-auto h-28 object-contain"
                    alt={product?.name} />}
            </div>
            <h1 className='text-lg pt-3 font-bold'>${product?.basePrice}</h1>
            <p className="text-gray-500 pt-1 truncate hover:text-clip dark:text-slate-400">{product?.name}</p>
        </div>
    );
};

export default RecommendedItemsCard;