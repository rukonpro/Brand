import React from 'react';
import Image from 'next/image';
import Link from "next/link";

const SourceCard = ({ photo, name, id }) => {
    return (
        <div className=' h-full relative overflow-hidden grid grid-cols-1'>

            <div className='absolute p-5'>
                <h1 className="text-2xl font-bold">{name}</h1>
                <Link href={`/source/${id}`}>
                    <button className='px-5 py-2 bg-white rounded-lg mt-3'>
                        Source Now
                    </button>
                </Link>
            </div>

            <div>
                <Image 
                className='w-full h-full object-cover' 
                src={photo} 
                height={300} 
                width={300} 
                loading='lazy'
                blurDataURL={photo}
                alt={name} />
            </div>
        </div>
    );
};

export default SourceCard;