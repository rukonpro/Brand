import React from 'react';
import Product1 from "@/public/images/image35.png";
import Image from 'next/image';
const OfferCard = () => {
    return (
        <div>
            <div className='flex justify-center p-2'>
                <Image src={Product1} alt='' />
            </div>
            <h1 className='text-center py-3'>Smart watches</h1>
            <div className='flex justify-center'>
                <span className='text-[#EB001B] bg-[#FFE3E3] px-3 py-1 rounded-full'>-25%</span>
            </div>
        </div>
    );
};

export default OfferCard;