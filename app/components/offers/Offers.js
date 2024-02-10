import React from 'react';
import OfferCard from './OfferCard';
import OfferTiming from './OfferTiming';

const Offers = () => {
    return (
        <div className='max-w-[1200px] mx-auto mt-5'>
            <div className='grid grid-cols-12 bg-white border-2 rounded-lg'>
                <div className="col-span-3">
                    <OfferTiming />
                </div>
                <div className='grid grid-cols-5 col-span-9 '>
                    <div className='border-l-2'>
                        <OfferCard />
                    </div>

                    <div className='border-l-2'>
                        <OfferCard />
                    </div>
                    <div className='border-l-2'>
                        <OfferCard />
                    </div>
                    <div className='border-l-2'>
                        <OfferCard />
                    </div>
                    <div className='border-l-2'>
                        <OfferCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offers;