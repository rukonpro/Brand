import React from 'react';
import Image from 'next/image';
import Product55 from "@/public/images/product55.png";
const RecommendedItemsCard = () => {
    return (
        <div className='p-5 border-2 rounded-lg bg-white'>
            <div className='flex justify-center'>
                <Image src={Product55} alt='' />
            </div>
            <h1 className='text-lg pt-5 font-bold'>$10.30</h1>
            <p className="text-gray-500 pt-1">Jeans shorts for men blue color</p>
        </div>
    );
};

export default RecommendedItemsCard;