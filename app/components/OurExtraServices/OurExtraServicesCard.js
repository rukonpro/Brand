import React from 'react';
import Image from 'next/image';


const OurExtraServicesCard = ({ data }) => {
    return (
        <div>

            <div className='h-[55px] w-[55px] rounded-full border-2 border-white bg-[#D1E7FF] flex justify-center items-center absolute top-[85px] right-5 z-[10]'>
                <Image src={data?.icon}  height={20} width={20} alt={data?.title+"Icon"}
                    className='h-5 w-5'
                />
            </div>

            <div className='relative'>
                <Image src={data?.cover} width={204} height={112}  alt={data?.title+"photo"} className='w-full h-28 backdrop-invert-0 bg-black/80 ' />
                <div className='p-5'>
                    <p>{data?.title}</p>
                </div>
            </div>


        </div>
    );
};

export default OurExtraServicesCard;