import React from 'react';
import Image from 'next/image';
const RecommendedItemsCard = ({product}) => {
    return (
        <div className='p-5 border-2 rounded-lg bg-white'>
            <div className='flex justify-center'>
                <Image src={product.image} alt='' />
            </div>
            <h1 className='text-lg pt-5 font-bold'>${product.price}</h1>
            <p className="text-gray-500 pt-1">{product.title}</p>
        </div>
    );
};

export default RecommendedItemsCard;