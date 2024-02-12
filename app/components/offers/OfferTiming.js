import React from 'react';

const OfferTiming = () => {
    return (
        <div className='px-3 py-3 grid grid-cols-2 md:grid-cols-1'>
            <div>
                <h1 className="md:text-2xl text-lg font-bold">Deals and offers</h1>
                <p className="text-gray-500 text-sm">Hygiene equipments</p>
            </div>

            <div className='grid grid-cols-4 gap-1 md:mt-5'>
                <div className='bg-[#606060] p-2 text-white rounded-lg w-full text-center'>
                <h1 className='text-sm text-center font-extrabold'>04</h1>
                    <p className='text-xs'>Days</p>
                </div>
                <div className='bg-[#606060] p-2 text-white rounded-lg w-full text-center'>
                    <h1 className='text-sm text-center font-extrabold'>13</h1>
                    <p className='text-xs'>Hour</p>
                </div>
                <div className='bg-[#606060] p-2 text-white rounded-lg w-full text-center'>
                    <h1 className='text-sm text-center font-extrabold'>34</h1>
                    <p className='text-xs'>Min</p>
                </div>
                <div className='bg-[#606060] p-2 text-white rounded-lg w-full text-center'>
                    <h1 className='text-sm text-center font-extrabold'>36</h1>
                    <p className='text-xs'>Sec</p>
                </div>
            </div>
        </div>
    );
};

export default OfferTiming;