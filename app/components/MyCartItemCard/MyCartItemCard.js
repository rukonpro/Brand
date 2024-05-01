import React from 'react';
import Image from "next/image";
import Link from "next/link";
import RemoveIcon from "@/public/images/delete-trash-svgrepo-com.svg";
import SaveIcon from "@/public/images/save-icon.svg";

const MyCartItemCard = ({product}) => {
    const quantities=[1,2,3,4,5,6,7,8,9,10];
    return (
        <div className="grid grid-cols-12 gap-0.5 md:gap-4 p-3 border-b bg-white">
            <div className="col-span-12 md:col-span-2">
                <Image
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="col-span-12 md:col-span-8">
                <h1 className="text-lg font-bold">T-shirts with multiple colors, for men
                    and lady</h1>
                <p className="text-sm text-gray-600 py-1">Size: medium, Color: blue,
                    Material: Plastic</p>
                <p className="text-sm text-gray-600">Seller: Artel Market</p>

                <div className="flex gap-4 pt-2 justify-between md:justify-start ">
                    <button type="button"
                            className="border-2 rounded text-red-500 font-bold text-sm py-0.5 px-2"
                    >

                      <Image src={RemoveIcon} height={20} alt="remove icon"/>
                    </button>
                    <button
                        className="border-2 rounded text-blue-500 font-bold text-sm py-0.5 px-2"
                    >
                        <Image src={SaveIcon} height={20} alt="remove icon"/>
                    </button>
                </div>
            </div>
            <div className="col-span-12 md:col-span-2 grid grid-cols-3 md:grid-cols-none items-center gap-4">

                <div>
                    <p className="py-3">${product.price}</p>
                </div>

                <div>
                <select className="w-full px-2 py-1 rounded-2xl">
                        {quantities.map((quantity, index) => {
                            return (
                                <option key={index} value={quantity}>{quantity}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="md:mt-5 flex justify-end md:justify-self-start">
                    <Link href={`/details/${product.title}`}
                          className="text-gray-600 hover:text-blue-500 hover:underline">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyCartItemCard;