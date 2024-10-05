import React from 'react';
import RequestsForm from './RequestsForm';
import Image from "next/image";
import bgImage from "@/public/images/image102.png"
const Requests = () => {
    return (
        <div className="px-3">
            <div className='grid grid-cols-12 gap-y-10  max-w-[1200px] rounded-lg overflow-hidden mx-auto md:p-10 p-3  mt-5  relative  bg-gradient-to-r from-emerald-600  dark:from-fuchsia-950  '
            >
                <Image
                    src={bgImage}
                    alt="Background"
                    fill
                    style={{ objectFit: 'cover' }}
                    quality={100}
                    className="-z-10"
                />
                <div className='md:col-span-8 col-span-12'>
                    <h1 className='text-4xl font-extrabold text-white'>An easy way to send <br /> requests to all suppliers</h1>
                    <p className='text-base text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing <br /> elit, sed do eiusmod tempor incididunt.</p>
                </div>

                <div className='md:col-span-4 col-span-12'>
                    <RequestsForm />
                </div>
            </div>
        </div>
    );
};

export default Requests;