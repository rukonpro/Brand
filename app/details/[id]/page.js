import React, { Suspense } from 'react';
import Nav from "@/app/components/navbar/nav";
import TickSign from "@/public/images/tickSign.png";
import Image from "next/image";
import SupplierCard from "@/app/components/SupplierCard/SupplierCard";
import BackButton from "@/app/components/BackButtons/BackButton";
import ImageChangeButton from '@/app/components/imageChangeButton/ImageChangeButton';
import RelatedProducts from "@/app/components/RelatedProducts/RelatedProducts";
import Loading from "@/app/loading";
import {getDetailsProduct} from "@/app/utils/product/fetch_products_api";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";
import SaveForLaterButton from "@/app/components/SavedForLaterItems/SaveForLaterButton";





const Details = async ({ params }) => {
    /*//https://www.figma.com/file/OO4BPb5dJMEaRxPvBPx2uC/Figma-ecommerce-UI-Kit-(web-%26-mobile)-(Community)?node-id=238%3A4835&mode=dev
*/

    const product = await getDetailsProduct({id: params.id});



    return (
        <div>
            <Nav />

            <div className="max-w-[1200px] mx-auto md:px-3  pb-5">

                <div className="flex justify-between items-center px-3 md:px-0">
                    <h1 className="text-2xl  font-bold text-gray-600 py-5 dark:text-slate-50">Details</h1>

                    <div>
                        <BackButton title="Back" />
                    </div>
                </div>
                <Suspense fallback={<Loading/>}>
                    <div className="grid grid-cols-12 gap-4 border-2 p-3 py-10  md:bg-white md:rounded-lg dark:bg-slate-800 dark:border-slate-700">
                        <div className="col-span-12 md:col-span-4">
                            <ImageChangeButton
                                images={product?.data?.photos}
                                name={product?.data?.name} />
                        </div>

                        <div className="col-span-12 md:col-span-8 lg:col-span-5">
                            <div className="flex justify-between items-center">
                                <div className="flex  gap-1">
                                    <Image src={TickSign} alt="TickSign"/>
                                    <p className="text-sm">{product?.data?.availability}</p>
                                </div>
                                {product?.data?.offers?.[0]?.discountValue&&
                                    <div>
                                    <p className="font-bold text-2xl text-red-500 bg-green-100 px-2 rounded-full dark:bg-slate-700 dark:text-green-500">{product?.data?.offers?.[0]?.discountValue}% Discount</p>
                                </div>
                                }
                            </div>
                            <div className="pt-5">
                                <h1 className="text-2xl font-bold">{product?.data?.name}</h1>

                                {/*<div className="grid grid-cols-3 gap-1 bg-orange-100/50 p-3 mt-3">*/}
                                {/*    <div>*/}
                                {/*        <h1 className="font-bold text-xl text-gray-700">$98.00</h1>*/}
                                {/*        <p>50-100 pcs</p>*/}
                                {/*    </div>*/}
                                {/*    <div className="border-l-2 border-gray-700/50 pl-3">*/}
                                {/*        <h1 className="font-bold text-xl text-gray-700">$98.00</h1>*/}
                                {/*        <p>100-700 pcs</p>*/}
                                {/*    </div>*/}
                                {/*    <div className="border-l-2 border-gray-700/50 pl-3">*/}
                                {/*        <h1 className="font-bold text-xl text-gray-700">$98.00</h1>*/}
                                {/*        <p>700+ pcs</p>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <div className="pt-5">
                                    {product?.data?.price && <div className="grid grid-cols-12 border-b-2 border-b-gray-700/50 pb-1">
                                        <p className="col-span-4">Price:</p>
                                        <p className="col-span-8">${product?.data?.price}</p>
                                    </div>
                                    }

                                    <div className="border-b-2 border-b-gray-700/50 pb-3">
                                        {product?.data?.colors?.length &&
                                            <div className="grid grid-cols-12 pt-3 ">
                                            <p className="col-span-4">color:</p>
                                            <p className="col-span-8">{
                                                product?.data?.colors?.map((color,index) => {
                                                    return (
                                                        <span
                                                            key={index}
                                                            className="mx-1 bg-blue-400 py-0.5 px-1 text-white rounded">{color}</span>
                                                    )
                                                })
                                            }</p>
                                        </div>}

                                        {product?.data?.sizes?.length &&
                                            <div className="grid grid-cols-12 pt-3 ">
                                            <p className="col-span-4">Sizes:</p>
                                            <p className="col-span-8">{
                                                product?.data?.sizes?.map((size,index) => {
                                                    return (
                                                        <span
                                                            key={index}
                                                            className="mx-1 bg-blue-400 py-0.5 px-1 text-white rounded">{size}</span>
                                                    )
                                                })
                                            }</p>
                                        </div>}


                                        {product?.data?.dimension &&
                                            <div className="grid grid-cols-12 pt-1 bg-orange-100/50 px-3 my-2 dark:bg-slate-700">
                                            <p className="col-span-4">Dimension:</p>
                                            <div className="col-span-8">
                                                <p>Height: {product?.data?.dimension?.height} m</p>
                                                <p>Weight: {product?.data?.dimension?.width} m</p>
                                                <p>Length: {product?.data?.dimension?.length} m</p>
                                            </div>
                                        </div>}
                                        {product?.data?.brand?.name &&
                                            <div className="grid grid-cols-12 pt-1 ">
                                            <p className="col-span-4">Brand:</p>
                                            <p className="col-span-8">{product?.data?.brand?.name}</p>
                                        </div>}

                                        {product?.data?.material && <div className="grid grid-cols-12 pt-1 ">
                                            <p className="col-span-4">Material:</p>
                                            <p className="col-span-8">{product?.data?.material}</p>
                                        </div>
                                        }

                                        <div className="grid grid-cols-12 pt-1">
                                            <p className="col-span-4">Design:</p>
                                            <p className="col-span-8">Modern nice</p>
                                        </div>
                                    </div>

                                    <div className="b-1">
                                        {product?.data?.description &&
                                            <div className="grid grid-cols-12 pt-1">
                                            <p className="col-span-4">Description:</p>
                                            <p className="col-span-8">{product?.data?.description}</p>
                                        </div>
                                        }
                                        {
                                            product?.data?.offers?.[0]?.description &&
                                            <div className="grid grid-cols-12 pt-1">
                                                <p className="col-span-4">Discount:</p>
                                                <p className="col-span-8">{product?.data?.offers?.[0]?.description}</p>
                                            </div>
                                        }
                                        <div className="grid grid-cols-12 pt-1">
                                            <p className="col-span-4">Protection:</p>
                                            <p className="col-span-8">Refund Policy</p>
                                        </div>
                                        {
                                            product?.data?.warranty &&
                                            <div className="grid grid-cols-12 pt-1">
                                                <p className="col-span-4">Warranty:</p>
                                                <p className="col-span-8">{product?.data?.warranty}</p>
                                            </div>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-span-12  lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-none gap-4 lg:gap-0">

                            {/************************Supplier Card ***********************/}
                            <SupplierCard />

                            <div className="pt-8">

                                {/************************Save for later button ***********************/}
                                <SaveForLaterButton product={product?.data}/>

                                {/************************Add to cart button ***********************/}
                                <AddToCartButton product={product?.data} />
                            </div>
                        </div>
                    </div>
                </Suspense>

                {/************************Related products ***********************/}
                 <Suspense fallback={<Loading/>}>
                    <RelatedProducts categoryId={product?.data?.categoryId} />
                </Suspense>

            </div>
        </div>
    );
};


export default Details;