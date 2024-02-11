import React from 'react';

const OfferTiming = () => {
    return (
        <div className='p-5  grid grid-cols-2 md:grid-cols-1'>
            <div>
                <h1 className="text-2xl font-bold">Deals and offers</h1>
                <p className="text-gray-500 text-sm">Hygiene equipments</p>
            </div>

            <div className='flex gap-2 md:mt-5'>
                <div className='bg-[#606060] p-2 text-white rounded-lg w-12'>
                <h1 className='text-sm text-center font-extrabold'>04</h1>
                    <p className='text-sm'>Days</p>
                </div>
                <div className='bg-[#606060] p-2 text-white rounded-lg w-12'>
                    <h1 className='text-sm text-center font-extrabold'>13</h1>
                    <p className='text-sm'>Hour</p>
                </div>
                <div className='bg-[#606060] p-2 text-white rounded-lg w-12'>
                    <h1 className='text-sm text-center font-extrabold'>34</h1>
                    <p className='text-sm'>Min</p>
                </div>
                <div className='bg-[#606060] p-2 text-white rounded-lg w-12'>
                    <h1 className='text-sm text-center font-extrabold'>36</h1>
                    <p className='text-sm'>Sec</p>
                </div>
            </div>
        </div>
    );
};

export default OfferTiming;