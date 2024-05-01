import React from 'react';
import Product1 from "@/public/images/image35.png";
import Image from 'next/image';
const OfferCard = ({product}) => {
    return (
        <div className="w-36 h-[240px] flex flex-col justify-between  ">
            <div className='flex justify-center p-2'>
                <Image src={product.image} alt='' className="h-36 w-full object-contain" />
            </div>

            <div className='flex justify-center'>
                <div>
                    <h1 className='text-center py-3'>Smart watches</h1>
                    <span className='text-[#EB001B] bg-[#FFE3E3] px-3 py-1 rounded-full'>-25%</span>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;