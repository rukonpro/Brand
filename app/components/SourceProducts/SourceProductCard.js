import React from 'react';
import Image from 'next/image';
import Product1 from "@/public/images/image35.png"
const SourceProductCard = ({product}) => {
    return (
        <div className='grid grid-cols-6 p-2'>
            <div className='col-span-4'>
                <h1 className="text-lg">{product.title}</h1>
                <p className="text-gray-600 pt-2">USD ${product.price}</p>
            </div>
            <div className='col-span-2 h-full flex items-end'>
                <Image src={product.image} alt={product.title} />
            </div>
        </div>
    );
};

export default SourceProductCard;