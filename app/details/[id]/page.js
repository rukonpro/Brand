import React from 'react';
import Navbar from "@/app/components/navbar/navbar";
import Nav from "@/app/components/navbar/nav";
import Product1 from "@/public/images/image34.png";
import TickSign from "@/public/images/tickSign.png";
import loveIconOutline from "@//public/images/loveIconOutline.png";
import Image from "next/image";
import Footer from "@/app/components/Footer/Footer";
import blueCartIcon from "@/public/images/blue-cart.png";
import SupplierCard from "@/app/components/SupplierCard/SupplierCard";
import RelatedProducts from "@/app/components/RelatedProducts/RelatedProducts";
import BackButton from "@/app/components/BackButtons/BackButton";
const Details = () => {



    /*//https://www.figma.com/file/OO4BPb5dJMEaRxPvBPx2uC/Figma-ecommerce-UI-Kit-(web-%26-mobile)-(Community)?node-id=238%3A4835&mode=dev
*/

    return (
        <div>
            <Navbar/>
            <Nav/>

            <div className="max-w-[1200px] mx-auto px-3  pb-5">

                <div className="flex justify-between items-center">
                    <h1 className="text-2xl  font-bold text-gray-600 py-5">Details</h1>

                    <div>
                        <BackButton title="Back"/>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4 border-2 p-3 py-10  bg-white rounded-lg">
                    <div className="col-span-12 md:col-span-4">
                        <div className="p-3 bg-white border-2 rounded flex justify-center">
                            <Image src={Product1} alt=""/>
                        </div>
                        <ol className="pt-3 flex gap-2 justify-center">
                            <li>
                                <button className="w-[56px] h-[56px] border-2 rounded">
                                    <Image src={Product1} alt=""/>
                                </button>
                            </li>
                            <li>
                                <button className="w-[56px] h-[56px] border-2 rounded">
                                    <Image src={Product1} alt=""/>
                                </button>
                            </li>
                            <li>
                                <button className="w-[56px] h-[56px] border-2 rounded">
                                    <Image src={Product1} alt=""/>
                                </button>
                            </li>
                            <li>
                                <button className="w-[56px] h-[56px] border-2 rounded">
                                    <Image src={Product1} alt=""/>
                                </button>
                            </li>

                        </ol>
                    </div>

                    <div className="col-span-12 md:col-span-8 lg:col-span-5">
                        <div className="flex  gap-1">
                            <Image src={TickSign} alt=""/>
                            <p className="text-sm">InStock</p>
                        </div>
                        <div className="pt-5">
                            <h1 className="text-2xl font-bold">Mens Long Sleeve T-shirt Cotton Base Layer Slim
                                Muscle</h1>

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
                                        <p className="col-span-8">Customized logo and design custom packages</p>
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
                    <div className="col-span-12  lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-none gap-4 lg:gap-0">

                        {/************************Supplier Card ***********************/}
                        <SupplierCard/>

                        <div className="pt-8">

                            {/************************Save for later button ***********************/}
                            <button
                                className="w-full  py-2 text-blue-500   mt-2 flex justify-center items-center gap-4 ">
                                <Image src={loveIconOutline} alt="loveIconOutline" className="h-4 w-4"/>
                                <span>Save for later</span>
                            </button>

                            {/************************Add to cart button ***********************/}
                            <button type="button"
                                    className="flex items-center gap-4 py-1 px-5 border-2 rounded-lg text-blue-600 mt-4 w-full justify-center hover:border-blue-500">
                                <Image src={blueCartIcon} alt="blue Cart Icon"/>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>

                {/************************Related products ***********************/}
                <RelatedProducts/>
            </div>

            <Footer/>
        </div>
    );
};

export default Details;