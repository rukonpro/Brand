import React from 'react';
import Image from "next/image";
import image from "@//public/images/offer-image-1.png";
const OfferTiming = () => {
    return (
        <div className=' relative overflow-hidden grid grid-cols-1 bg-gray-700/50 '>

            <div className='absolute p-5'>
             <h1 className="md:text-2xl text-2xl font-bold dark:text-slate-900">Deals and offers</h1>
            </div>

            <div className="h-[256px]">
                <Image className='w-full h-full object-cover' src={image} alt='offter photo'/>
            </div>
        </div>

    );
};

export default OfferTiming;