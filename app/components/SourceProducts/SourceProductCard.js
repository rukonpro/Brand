import React from 'react';
import Image from 'next/image';
import Product1 from "@/public/images/image35.png"
const SourceProductCard = () => {
    return (
        <div className='grid grid-cols-6 p-2'>
            <div className='col-span-4'>
                <h1>Soft chairs</h1>
                <p>From <br />USD 19</p>
            </div>
            <div className='col-span-2 h-full flex items-end'>
                <Image src={Product1} alt='' />
            </div>
        </div>
    );
};

export default SourceProductCard;