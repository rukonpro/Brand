"use client"
import React from 'react'
import AddToCartButton from '../components/AddToCartButton/AddToCartButton'
import SaveForLaterButton from '../components/SavedForLaterItems/SaveForLaterButton'
import ImageChangeButton from '../components/imageChangeButton/ImageChangeButton'
import { PiImageBrokenLight } from 'react-icons/pi'
import { AiOutlineCheck } from 'react-icons/ai'
import { MdBlockFlipped } from 'react-icons/md'
import Countdown from '../components/Countdown/Countdown'
import Image from 'next/image'

function DetailsComponent({ product }) {
    
    return (
        <div
            className="grid grid-cols-12 gap-4 md:border-2 p-3  md:bg-white md:rounded-lg dark:bg-slate-800 dark:border-slate-700 relative">
            <div className="col-span-12 md:col-span-4">

                <div className='absolute right-3 top-3'>
                    <SaveForLaterButton product={product?.data} />
                </div>
                {product?.data?.variant?.length > 0 ?
                    (<ImageChangeButton

                        product={product?.data}
                    />) :

                    (

                        <PiImageBrokenLight
                            size={400}
                        />)
                }


            </div>

            <div className="col-span-12 md:col-span-8 ">
                <div className="flex justify-between items-center">
                    <div className="flex  gap-1 items-center">
                        {product?.data?.availability === "IN_STOCK" ?
                            <AiOutlineCheck className="text-green-500 size-8" /> :
                            <MdBlockFlipped className="text-red-500 size-8" />}

                        <p className="text-sm">{product?.data?.availability}({product?.data?.totalStock || "00"})</p>
                    </div>
                    {product?.data?.offers?.[0]?.isActive &&
                        <div className="border rounded p-3 dark:border-slate-700">

                            <p className="font-bold text-2xl text-red-500 bg-green-100 px-2 rounded-full dark:bg-slate-700 dark:text-green-500">{product?.data?.offers?.[0]?.discountValue}%
                                Discount</p>
                            <div className="flex justify-center">
                                <Countdown endDate={product?.data?.offers?.[0]?.endDate} />
                            </div>
                        </div>
                    }
                </div>
                <div className="pt-5">
                    <h1 className="text-2xl font-bold">{product?.data?.name}</h1>
                    <p> Rating: {product?.data?.rating}</p>

                    {product?.data?.brand?.name &&
                        <div className="grid grid-cols-12 pt-1 ">
                            <p className="col-span-4">Brand:</p>
                            <p className="col-span-8">{product?.data?.brand?.name}</p>
                        </div>}

                    <div className='border-t border-slate-50 dark:border-slate-700 mt-6' />

                    <div className="pt-5 ">
                        {product?.data?.basePrice &&
                            <div className="grid grid-cols-12  pb-1">
                                <p className="col-span-4">Price:</p>
                                <p className="col-span-8 text-3xl text-blue-500">{product?.data?.basePrice > 0 ?
                                    "$" + product?.data?.basePrice : "free"}</p>
                            </div>
                        }

                        <div className="grid grid-cols-12 pb-1 pt-6">
                            <p className="col-span-4">Tax percentage:</p>
                            <p className="col-span-8">{product?.data?.taxPercentage > 0 ? product?.data?.taxPercentage + "%" : "Free"}</p>
                        </div>


                        {product?.data?.deliveryFee &&
                            <div className="grid grid-cols-12  pb-1">
                                <p className="col-span-4">Delivery fee:</p>
                                <p className="col-span-8">{product?.data?.deliveryFee > 0 ? "$" + product?.data?.deliveryFee : "Free"}</p>
                            </div>
                        }


                        {product?.data?.design && <div className="grid grid-cols-12 pt-1">
                            <p className="col-span-4">Design:</p>
                            <p className="col-span-8">{product?.data?.design}</p>
                        </div>
                        }



                        {product?.data?.protection &&
                            <div className="grid grid-cols-12 pt-1">
                                <p className="col-span-4 ">Protection:</p>
                                <p className="col-span-8">{product?.data?.protection}</p>
                            </div>}
                        {
                            product?.data?.warranty &&
                            <div className="grid grid-cols-12 pt-1">
                                <p className="col-span-4 ">Warranty:</p>
                                <p className="col-span-8">{product?.data?.warranty}</p>
                            </div>
                        }
                    </div>
                    <div className='border-t border-slate-50 dark:border-slate-700 mt-6' />


                    {
                        product?.data?.variant?.length > 0 &&

                        <ul className='grid grid-cols-5 gap-3 pt-5'>
                            {
                                product?.data?.variant?.map((variant) => {
                                    return (
                                        <li key={variant?.id} className=' cursor-pointer border-2 border-blue-500 rounded-lg '>
                                            <div className='p-2'>
                                                <Image src={variant?.images?.[0]} height={100} width={100} alt={variant?.color}
                                                    className='w-full object-contain'
                                                />
                                            </div>

                                            <div className='pb-2'>
                                                {variant?.price && <div className='grid grid-cols-2 hover:bg-slate-700 px-2'>
                                                    <p className='col-span-1 text-sm'>Price</p>
                                                    <p className='col-span-1 text-sm'>: ${variant?.price}</p>
                                                </div>}
                                                {variant?.color && <div className='grid grid-cols-2 hover:bg-slate-700 px-2'>
                                                    <p className='col-span-1 text-sm'>Color</p>
                                                    <p className='col-span-1 text-sm'>: {variant?.color}</p>
                                                </div>}
                                                {variant?.size && <div className='grid grid-cols-2 hover:bg-slate-700 px-2'>
                                                    <p className='col-span-1 text-sm'>Size</p>
                                                    <p className='col-span-1 text-sm'>: {variant?.size}</p>
                                                </div>}
                                                {variant?.storage && <div className='grid grid-cols-2 hover:bg-slate-700 px-2'>
                                                    <p className='col-span-1 text-sm'>Storage</p>
                                                    <p className='col-span-1 text-sm'>: {variant?.storage}</p>
                                                </div>}
                                                {variant?.weight && <div className='grid grid-cols-2 hover:bg-slate-700 px-2'>
                                                    <p className='col-span-1 text-sm'>Weight</p>
                                                    <p className='col-span-1 text-sm'>: {variant?.weight}</p>
                                                </div>}
                                                {variant?.dimensions && <div className='grid grid-cols-2 hover:bg-slate-700 px-2'>
                                                    <p className='col-span-2 text-xs'>{variant?.dimensions}</p>
                                                </div>}
                                                {<div className='grid grid-cols-2 hover:bg-slate-700 px-2'>
                                                    <p className='col-span-1 text-sm'>Stock</p>
                                                    <p className='col-span-1 text-sm'>: {variant?.stock || "Out of stock"}</p>
                                                </div>}
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }

                    {product?.data && <div className="flex justify-end max-w-72">

                        <AddToCartButton product={product?.data} />

                    </div>}

                </div>
            </div>



        </div>
    )
}

export default DetailsComponent
