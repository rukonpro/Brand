import React from 'react';
import Image from 'next/image';
const OfferCard = ({offer}) => {
    return (
        <div className="w-36 h-[240px] flex flex-col justify-between  ">
            <div className='flex justify-center p-2'>
                <Image src={offer?.product?.photos?.[0]} alt={offer?.product?.name} width={100} height={100} className="h-36 w-full object-conver" />
            </div>

            <div className='flex justify-center'>
                <div>
                    <h1 className='text-center py-3 truncate'>{offer?.product?.name}</h1>
                    <span className='text-[#EB001B] bg-[#FFE3E3] dark:bg-slate-700 dark:text-stone-100 px-3 py-1 rounded-full'>{offer?.discountValue}%</span>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;