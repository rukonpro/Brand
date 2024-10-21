import React from 'react';
import Image from "next/image";
import Link from "next/link";

import RemoveAddToCartButton from "@/app/components/AddToCartButton/RemoveAddToCartButton";
import { FaSave } from "react-icons/fa";
const MyCartItemCard = ({ item }) => {
    return (
        <div className="grid grid-cols-12  md:gap-4 p-3 border-b bg-white dark:bg-slate-700 dark:border-slate-700 relative">
            <div className="absolute top-0 right-0 ">
                <RemoveAddToCartButton itemId={item?.id} />
            </div>
            <div className="col-span-12 md:col-span-2 flex justify-center">
                <Image
                    src={item?.variant?.images?.[0]}
                    alt={item?.productName}
                    height={100}
                    width={100}
                    className="h-28 w-auto object-contain "
                />
            </div>
            <div className="col-span-12 md:col-span-8  ">
                <h1 className="text-lg font-bold truncate hover:text-clip">{item?.productName}</h1>
                <ul className="text-sm text-gray-600 py-1 dark:text-slate-300">

                    {item?.selectedAttributes &&
                        Object.entries(item?.selectedAttributes)?.map(([key, value], index) => (

                            <li key={index}>
                                <span className="font-bold " >{key}: {value}</span>
                            </li>

                        ))}

                    <p>Quantity: {item?.quantity}</p>

                </ul>

                <div className="flex gap-4 pt-2 justify-between md:justify-start ">

                    <button
                        className="border-2 dark:border-slate-600 rounded text-blue-500 font-bold text-sm py-0.5 px-2"
                    >
                        <FaSave size={25} />
                    </button>
                </div>
            </div>
            <div className="col-span-12 md:col-span-2 grid grid-cols-3 md:grid-cols-none items-center gap-4 ">

                <div>
                    <p className="py-3">${item?.price}</p>
                </div>


                <div >
                    <Link href={`/details/${item?.productId}`}
                        className="text-gray-600 hover:text-blue-500 hover:underline dark:text-slate-300">
                        Details
                    </Link>
                </div>
            </div>
            <div className="md:col-span-6 col-span-12">
                {/* <AddToCartButton product={product} formCartPage={true} /> */}
            </div>
        </div>
    );
};

export default MyCartItemCard;