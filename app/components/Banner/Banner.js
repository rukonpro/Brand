import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import BannerImage from "@/public/images/Banner-board.png";
import Avater from "@/public/images/avatar.png";

const Banner = () => {
    return (
        <div className="md:px-3">
            <div className="max-w-[1200px] mx-auto border md:rounded-lg md:px-3  md:pt-3 pb-3 md:mt-5 bg-white ">
                <div className='grid grid-cols-12 gap-3'>
                    <div className='md:col-span-3 col-span-12 px-3 md:px-0'>
                        <ul className="md:block hidden">
                        <li>
                                <Link href=""
                                      className='w-full inline-block px-3 py-2 rounded-lg bg-[#E3F0FF] hover:bg-[#E3F0FF]'>Automobiles</Link>
                            </li>
                            <li>
                                <Link href=""
                                      className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Clothes
                                    and wear</Link>
                            </li>
                            <li>
                                <Link href=""
                                      className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Home
                                    interiors</Link>
                            </li>
                            <li>
                                <Link href=""
                                      className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Computer
                                    and tech</Link>
                            </li>
                            <li>
                                <Link href=""
                                      className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Tools,
                                    equipments</Link>
                            </li>
                            <li>
                                <Link href=""
                                      className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Sports
                                    and outdoor</Link>
                            </li>
                            <li>
                                <Link href=""
                                      className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Animal
                                    and pets</Link>
                            </li>
                            <li>
                                <Link href=""
                                      className='w-full inline-block px-3 py-2 mt-2 rounded-lg hover:bg-[#E3F0FF]'>Machinery
                                    tools</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='md:col-span-7 col-span-12 relative'>
                        <div className='absolute top-8 left-5'>
                            <h1 className='text-3xl text-gray-950'><span>Latest trending</span> <br/> <span
                                className='font-extrabold '> Electronic items</span></h1>

                            <button type='button' className="bg-white rounded-xl px-4 py-2 mt-5">
                                Learn more
                            </button>
                        </div>
                        <Image src={BannerImage} alt='' className='h-full w-full object-cover  '/>
                    </div>

                    <div
                        className='md:col-span-2 col-span-12 grid md:grid-cols-1 sm:grid-cols-3 grid-cols-2 gap-3 px-3 md:px-0'>
                        <div className=" p-3 bg-[#E3F0FF] rounded-lg sm:col-span-1 col-span-2 ">
                            <div className='grid grid-cols-3 gap-2 items-center'>
                                <div className="col-span-1">
                                    <Image className="rounded-full h-[44px] w-[44px] object-contain bg-white p-1"
                                           src={Avater} alt=''/>
                                </div>
                                <h1 className="col-span-2">Hi, user {"let’s get stated"}</h1>
                            </div>

                            <button className="rounded-lg bg-blue-500 text-white py-1 px-2 mt-2 inline-block w-full">
                                Join now
                            </button>
                            <button className="rounded-lg bg-white py-1 px-2 mt-2 inline-block w-full">
                                Login
                            </button>
                        </div>

                        <div className=" p-3 rounded-lg bg-[#F38332] text-white w-full h-full">
                            <h1>Get US $10 off <br/> <span className="text-sm">with a new <br/> supplier</span></h1>
                        </div>

                        <div className="p-3 rounded-lg bg-[#55BDC3] text-white w-full h-full">
                            <h1>Get US $10 off <br/> <span className="text-sm">with a new <br/> supplier</span></h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Banner;
