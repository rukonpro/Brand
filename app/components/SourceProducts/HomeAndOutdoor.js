import React from 'react';

import SourceCard from './SourceCard';
import SourceProductCard from './SourceProductCard';
import CoverImage from "@/public/images/image92.png";
const HomeAndOutdoor = () => {
    return (
        <div className='max-w-[1200px] mx-auto mt-5'>
            <div className='grid grid-cols-12 bg-white border-2 rounded-lg'>
                <div className="col-span-3">
                    <SourceCard image={CoverImage} />
                </div>
                <div className='grid grid-cols-5 col-span-9 '>
                    <div className='border-b-2 border-l-2'>
                        <SourceProductCard />
                    </div>

                    <div className='border-b-2 border-l-2'>
                        <SourceProductCard />
                    </div>
                    <div className='border-b-2 border-l-2'>
                        <SourceProductCard />
                    </div>
                    <div className='border-b-2 border-l-2'>
                        <SourceProductCard />
                    </div>
                    <div className='border-b-2 border-l-2'>
                        <SourceProductCard />
                    </div>
                    <div className=' border-l-2'>
                        <SourceProductCard />
                    </div>
                    <div className=' border-l-2'>
                        <SourceProductCard />
                    </div>
                    <div className=' border-l-2'>
                        <SourceProductCard />
                    </div>
                    <div className=' border-l-2'>
                        <SourceProductCard />
                    </div>
                    <div className=' border-l-2'>
                        <SourceProductCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeAndOutdoor;