import React from 'react';
import Image from 'next/image';

const SourceCard = ({image,title}) => {
    return (
        <div className='h-[240px] relative overflow-hidden grid grid-cols-1'>

            <div className='absolute p-5'>
                <h1 className="text-2xl font-bold">{title}</h1>
                <button className='px-5 py-2 bg-white rounded-lg mt-3'>
                    Source Now
                </button>
            </div>

            <div>
                <Image className='w-full h-full object-cover' src={image} alt='' />
            </div>
        </div>
    );
};

export default SourceCard;