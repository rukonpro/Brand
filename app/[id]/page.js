import React from 'react';
import Navbar from "@/app/components/navbar/navbar";
import Nav from "@/app/components/navbar/nav";
import Product1 from "@/public/images/image34.png";
import TickSign from "@/public/images/tickSign.png";
import Image from "next/image";
const Details = () => {
    return (
        <div>
            <Navbar/>
            <Nav/>
            <div className="max-w-[1200px] mx-auto">
                <div className="border-2 p-3 grid grid-cols-12">
                    <div className="col-span-4">
                        <div className="w-[380px] p-3 bg-white">
                            <Image src={Product1} alt=""/>
                        </div>
                        <div className="pt-3 flex gap-2">
                            <div className="w-[56px] h-[56px]">
                                <Image src={Product1} alt=""/>
                            </div>
                            <div className="w-[56px] h-[56px]">
                                <Image src={Product1} alt=""/>
                            </div>
                            <div className="w-[56px] h-[56px]">
                                <Image src={Product1} alt=""/>
                            </div>
                            <div className="w-[56px] h-[56px]">
                                <Image src={Product1} alt=""/>
                            </div>
                            <div className="w-[56px] h-[56px]">
                                <Image src={Product1} alt=""/>
                            </div>
                            <div className="w-[56px] h-[56px]">
                                <Image src={Product1} alt=""/>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-5">
                        <div className="flex  gap-1">
                            <Image src={TickSign} alt=""/>
                            <p className="text-sm">InStock</p>
                        </div>
                        <div className="pt-5">
                            <h1 className="text-2xl font-bold">Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle</h1>

                            <div className="grid grid-cols-3 gap-1 bg-orange-100/50 p-3 mt-3">
                                <div>
                                    <h1 className="font-bold text-xl text-gray-700">$98.00</h1>
                                    <p>50-100 pcs</p>
                                </div>
                                <div className="border-l-2 border-gray-700/50 pl-3">
                                    <h1 className="font-bold text-xl text-gray-700">$98.00</h1>
                                    <p>100-700 pcs</p>
                                </div>
                                <div className="border-l-2 border-gray-700/50 pl-3">
                                    <h1 className="font-bold text-xl text-gray-700">$98.00</h1>
                                    <p>700+ pcs</p>
                                </div>
                            </div>

                            <div className="pt-5">
                                <div className="grid grid-cols-12 border-b-2 border-b-gray-700/50 pb-1">
                                    <p className="col-span-4">Price:</p>
                                    <p className="col-span-8">Negotiable</p>
                                </div>
                                <div className="border-b-2 border-b-gray-700/50 pb-3">
                                    <div className="grid grid-cols-12 pt-3 ">
                                        <p className="col-span-4">Type:</p>
                                        <p className="col-span-8">Classic shoes</p>
                                    </div>
                                    <div className="grid grid-cols-12 pt-1 ">
                                        <p className="col-span-4">Material:</p>
                                        <p className="col-span-8">Plastic material</p>
                                    </div>
                                    <div className="grid grid-cols-12 pt-1">
                                        <p className="col-span-4">Design:</p>
                                        <p className="col-span-8">Modern nice</p>
                                    </div>
                                </div>

                                <div className="b-1">
                                    <div className="grid grid-cols-12 pt-1">
                                        <p className="col-span-4">Customization:</p>
                                        <p className="col-span-8">Customized logo and  design custom packages</p>
                                    </div>
                                    <div className="grid grid-cols-12 pt-1">
                                        <p className="col-span-4">Protection:</p>
                                        <p className="col-span-8">Refund Policy</p>
                                    </div>
                                    <div className="grid grid-cols-12 pt-1">
                                        <p className="col-span-4">Warranty:</p>
                                        <p className="col-span-8">2 years full warranty </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
