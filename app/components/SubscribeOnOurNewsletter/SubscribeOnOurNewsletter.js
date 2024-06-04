import React from 'react';
import Image from 'next/image';
import EmailIcon from "@/public/images/emailIcon.png";
const SubscribeOnOurNewsletter = () => {
    return (
        <div className='bg-gray-200  px-3'>
            <div className='max-w-[1200px] mx-auto py-10'>
                <div className='flex justify-center'>
                    <div className=''>
                        <h1 className='text-2xl text-center font-bold'>Subscribe on our newsletter</h1>
                        <p className='text-base text-center text-gray-700'>Get daily news on upcoming offers from many suppliers all over the world</p>


                        <div className='pt-4 grid grid-cols-6  gap-3 '>
                            <div className="relative col-span-4">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="border border-blue-300 rounded-md py-2 pl-10  focus:outline-none focus:border-blue-500 w-full"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Image src={EmailIcon} className="h-5 w-5 text-gray-400" alt='EmailIcon' />
                                </div>
                            </div>

                            <button className='col-span-2 bg-blue-500 px-3 text-white rounded-lg focus:outline outline-blue-400 py-2'>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscribeOnOurNewsletter;