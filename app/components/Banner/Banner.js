import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import BannerImage from "@/public/images/Banner-board.png";
import Avater from "@/public/images/avater.png";

const Banner = () => {
    return (
        <div className="max-w-[1200px] mx-auto border rounded-lg p-3 mt-5 bg-white">
            <div className='grid grid-cols-12 gap-3'>
                <div className='col-span-3'>
                    <Link href="" className='w-full inline-block px-3 py-2 rounded-lg bg-[#E3F0FF] hover:bg-[#E3F0FF]'>Automobiles</Link>
                    <Link href="" className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Clothes and wear</Link>
                    <Link href="" className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Home interiors</Link>
                    <Link href="" className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Computer and tech</Link>
                    <Link href="" className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Tools, equipments</Link>
                    <Link href="" className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Sports and outdoor</Link>
                    <Link href="" className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Animal and pets</Link>
                    <Link href="" className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Machinery tools</Link>

                </div>
                <div className='col-span-7 relative'>

                    <div className='absolute top-10 left-5'>
                        <h1 className='text-3xl'><span >Latest trending</span> <br /> <span className='font-extrabold '> Electronic items</span> </h1>

                        <button type='button' className="bg-white rounded-xl px-4 py-2 mt-5">
                            Learn more
                        </button>
                    </div>

                    <Image src={BannerImage} alt='' className='h-full w-full object-cover ' />

                </div>

                <div className='col-span-2'>
                    <div className=" p-3 bg-[#E3F0FF] rounded-lg">
                        <div className='flex gap-2 items-center'>
                            <div>
                                <Image className="rounded-full h-[44px] w-[44px]" src={Avater} alt='' />
                            </div>
                            <h1>Hi, user <br />{"let’s get stated"}</h1>
                        </div>

                        <button className="rounded-lg bg-blue-500 text-white py-1 px-2 mt-2 inline-block w-full">
                            Join now
                        </button>
                        <button className="rounded-lg bg-white py-1 px-2 mt-2 inline-block w-full">
                            Login
                        </button>
                    </div>

                    <div className="h-[95px] p-3 rounded-lg bg-[#F38332] text-white mt-3">
                        <h1>Get US $10 off <br /> <span className="text-sm">with a new <br /> supplier</span></h1>
                    </div>

                    <div className="h-[95px] p-3 rounded-lg bg-[#55BDC3] text-white mt-3">
                        <h1>Get US $10 off <br /> <span className="text-sm">with a new <br /> supplier</span></h1>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;