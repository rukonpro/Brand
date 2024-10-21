import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

import RemoveAddToCartButton from "@/app/components/AddToCartButton/RemoveAddToCartButton";
import { FaSave } from "react-icons/fa";
import { GrAdd, GrFormSubtract } from 'react-icons/gr';
const MyCartItemCard = ({ item, mutate }) => {
    const [quantity, setQuantity] = useState(item?.quantity);

    
    return (
        <div className="grid grid-cols-12  gap-4 border-b bg-white dark:bg-slate-700 dark:border-slate-700 relative p-2">
            <div className="absolute top-0 right-0 ">
                <RemoveAddToCartButton itemId={item?.id} mutate={mutate} />
            </div>
            <div className="col-span-3 flex justify-center">
                <Image
                    src={item?.variant?.images?.[0]}
                    alt={item?.productName}
                    height={100}
                    width={100}
                    className=" w-auto object-contain "
                />
            </div>
            <div className="col-span-6  ">
                <h1 className="text-lg font-bold truncate hover:text-clip">{item?.productName}</h1>
                <ul className="text-sm text-gray-600 py-1 dark:text-slate-300">

                    {item?.selectedAttributes &&
                        Object.entries(item?.selectedAttributes)?.map(([key, value], index) => (

                            <li key={index}>
                                <span className="font-bold " >{key}: {value}</span>
                            </li>

                        ))}

                    <li>Quantity: {item?.quantity}</li>
                </ul>

                <div >
                    <Link href={`/details/${item?.productId}`}
                        className="text-gray-600 hover:text-blue-500 hover:underline dark:text-slate-300">
                        Details
                    </Link>
                </div>

                <div className="flex gap-4 pt-2 justify-between md:justify-start ">

                    <button
                        className="border-2 dark:border-slate-600 rounded text-blue-500 font-bold text-sm py-0.5 px-2"
                    >
                        <FaSave size={25} />
                    </button>
                </div>
            </div>
            <div className="col-span-3  justify-between gap-4 flex flex-col items-end  ">

                <div>
                    <p className="py-3 text-lg">${item?.price}</p>
                </div>




                {/* Quantity Selection */}


                <div className=" flex flex-col gap-1 "> {/* Flex container for alignment */}
                    <button
                        // onClick={decrement}
                        disabled={quantity <= 1}
                        className={`p-0.5 w-10 flex justify-center items-center border-2 border-blue-200  rounded-md bg-transparent hover:border-blue-500 text-blue-500 font-bold ${quantity <= 1 ? "opacity-20" : ""}`}
                    >
                        <GrFormSubtract size={20} />
                    </button>
                    <input
                        type="number"
                        min={1}
                        value={quantity}
                        // onChange={handleChange}
                        className="p-0.5 w-10 border-2 text-center text-blue-500 font-bold bg-inherit appearance-none border-blue-200 rounded-md  hover:border-blue-500"
                        style={{ appearance: 'none', MozAppearance: 'textfield' }}
                    />
                    <button
                        // onClick={increment}
                        // disabled={matchingVariant?.stock <= quantity}
                        className={`p-0.5 w-10 flex justify-center items-center border-2 border-blue-200 rounded-md bg-transparent hover:border-blue-500 text-blue-500 font-bold `}
                    >
                        <GrAdd size={20} />
                    </button>
                </div>

            </div>

        </div>
    );
};

export default MyCartItemCard;