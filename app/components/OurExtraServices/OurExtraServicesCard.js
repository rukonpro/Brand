import React from 'react';
import Image from 'next/image';


const OurExtraServicesCard = ({ data }) => {
    return (
        <div className='rounded-lg border-2 bg-white relative overflow-hidden'>

            <div className='h-[55px] w-[55px] rounded-full border-2 border-white bg-[#D1E7FF] flex justify-center items-center absolute bottom-14 right-5 z-[100]'>
                <Image src={data?.icon} alt=''
                    className='h-5 w-5'
                />
            </div>

            <div className='relative'>
                <Image src={data?.cover} alt="" className='w-full  backdrop-invert-0 bg-black/80 ' />
                <div className='p-5'>
                    <p>{data?.title}</p>
                </div>
            </div>


        </div>
    );
};

export default OurExtraServicesCard;