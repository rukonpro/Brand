import React from 'react';
import Image from "next/image";
import image from "@//public/images/offer-image-1.png";
const OfferTiming = () => {
    return (
        <div className=' relative overflow-hidden grid grid-cols-1 bg-gray-700/50'>

            <div className='absolute p-5'>
                <div className='px-3 py-3 grid grid-cols-1 gap-y-10'>
                    <div>
                        <h1 className="md:text-2xl text-2xl font-bold">Deals and offers</h1>
                        <p className="text-gray-700 text-sm">Hygiene equipments</p>
                    </div>

                    <div className='grid grid-cols-4 gap-1 md:mt-5'>
                        <div
                            className='md:bg-[#606060]/50 bg-amber-100/50 p-2 md:text-white text-gray-800 rounded-lg w-full text-center'>
                            <h1 className='text-sm text-center font-extrabold'>04</h1>
                            <p className='text-xs '>Days</p>
                        </div>
                        <div
                            className='md:bg-[#606060]/50 bg-amber-100/50 p-2 md:text-white text-gray-800 rounded-lg w-full text-center'>
                            <h1 className='text-sm text-center font-extrabold'>13</h1>
                            <p className='text-xs'>Hour</p>
                        </div>
                        <div
                            className='md:bg-[#606060]/50 bg-amber-100/50 p-2 md:text-white text-gray-800 rounded-lg w-full text-center'>
                            <h1 className='text-sm text-center font-extrabold'>34</h1>
                            <p className='text-xs'>Min</p>
                        </div>
                        <div
                            className='md:bg-[#606060]/50 bg-amber-100/50 p-2 md:text-white text-gray-800 rounded-lg w-full text-center'>
                            <h1 className='text-sm text-center font-extrabold'>36</h1>
                            <p className='text-xs'>Sec</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[256px]">
                <Image className='w-full h-full object-cover' src={image} alt=''/>
            </div>
        </div>

    );
};

export default OfferTiming;