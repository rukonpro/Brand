import React, {Suspense} from 'react';
import Image from 'next/image';
import Countdown from "@/app/components/Countdown/Countdown";
const OfferCard = ({offer}) => {
    return (
        <div className="w-40 h-[240px] flex flex-col justify-between  p-2 ">

                <div className="absolute top-0 right-0">
                    <Countdown endDate={offer?.endDate}/>
                </div>

            <div className='flex justify-center '>
                <Image src={offer?.product?.photos?.[0]} alt={offer?.product?.name} width={100} height={100} className="h-36 w-full object-fill" />
            </div>

            <div className='flex justify-center'>
                <div>
                    <p className='text-center py-3  truncate hover:text-clip'>{offer?.product?.name?.slice(0,20)}</p>
                    <div className="flex gap-2 justify-between items-center">
                        <span
                            className='text-[#EB001B] bg-[#FFE3E3] dark:bg-slate-700 dark:text-stone-100 px-3 py-1 rounded-full'>{offer?.discountValue}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;