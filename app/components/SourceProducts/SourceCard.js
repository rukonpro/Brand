import React from 'react';
import Image from 'next/image';
import Link from "next/link";

const SourceCard = ({image,title,id}) => {
    return (
        <div className='h-[240px] relative overflow-hidden grid grid-cols-1'>

            <div className='absolute p-5'>
                <h1 className="text-2xl font-bold">{title}</h1>
                <Link href={`/source/${id}`}>
                    <button className='px-5 py-2 bg-white rounded-lg mt-3'>
                        Source Now
                    </button>
                </Link>
            </div>

            <div>
                <Image className='w-full h-full object-cover' src={image} alt='' />
            </div>
        </div>
    );
};

export default SourceCard;