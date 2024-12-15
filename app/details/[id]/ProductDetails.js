"use client"

import { useCart } from '@/app/context/CartContext'
import React from 'react'

export default function ProductDetails({ product }) {
    const { selectVariant } = useCart();
  

    return (
        <div>
            <h1 className="text-2xl font-bold">{product?.name} </h1>
            {product?.availability && <p> Availability: ({selectVariant?.availability})</p>}
            {product?.rating && <p> Rating: {product?.rating}</p>}

            {selectVariant?.availability &&
                <div className="grid grid-cols-12 pt-1 ">
                    <p className="col-span-4">Availability:</p>
                    <p className="col-span-8">({selectVariant?.availability})</p>
                </div>}

            {product?.brand?.name &&
                <div className="grid grid-cols-12 pt-1 ">
                    <p className="col-span-4">Brand:</p>
                    <p className="col-span-8">{product?.brand?.name}</p>
                </div>}

            {product?.description &&
                <div className='mt-10'>
                    <h3 className="text-lg  pb-2">Description:</h3>
                    <p className=" text-justify">{product?.description}</p>
                </div>
            }

            <div className='border-t border-slate-50 dark:border-slate-700 mt-6' />

            <div className="pt-5 ">
                {product?.basePrice &&
                    <div className="grid grid-cols-12  pb-1">
                        <p className="col-span-4">Price:</p>
                        <p className="col-span-8 text-3xl text-blue-500">${selectVariant?.price || product?.basePrice}</p>
                    </div>
                }

                <div className="grid grid-cols-12 pb-1">
                    <p className="col-span-4">Tax:</p>
                    <p className="col-span-8">{product?.taxPercentage > 0 ? product?.taxPercentage + "%" : "Free"}</p>
                </div>



                <div className="grid grid-cols-12  pb-1">
                    <p className="col-span-4">Delivery fee:</p>
                    <p className="col-span-8">{product?.deliveryFee > 0 ? "$" + product?.deliveryFee : "Free"}</p>
                </div>



                {product?.design && <div className="grid grid-cols-12 pt-1">
                    <p className="col-span-4">Design:</p>
                    <p className="col-span-8">{product?.design}</p>
                </div>
                }



                {product?.protection &&
                    <div className="grid grid-cols-12 pt-1">
                        <p className="col-span-4 ">Protection:</p>
                        <p className="col-span-8">{product?.protection}</p>
                    </div>}
                {
                    product?.warranty &&
                    <div className="grid grid-cols-12 pt-1">
                        <p className="col-span-4 ">Warranty:</p>
                        <p className="col-span-8">{product?.warranty}</p>
                    </div>
                }
            </div>
            <div className='border-t border-slate-50 dark:border-slate-700 mt-6' />
        </div>
    )
}
