import React from 'react';
import Image from "next/image";
import Link from "next/link";
import SaveIcon from "@/public/images/save-icon.svg";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";
import RemoveAddToCartButton from "@/app/components/AddToCartButton/RemoveAddToCartButton";

const MyCartItemCard = ({product}) => {
    return (
        <div className="grid grid-cols-12 gap-0.5 md:gap-4 p-3 border-b bg-white">
            <div className="col-span-12 md:col-span-2">
                <Image
                    src={product?.photos?.[0]}
                    alt={product?.name}
                    height={100}
                    width={100}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="col-span-12 md:col-span-8">
                <h1 className="text-lg font-bold">{product?.name}</h1>
                <p className="text-sm text-gray-600 py-1">Size: medium, Color: blue,
                    Material: Plastic</p>
                <p className="text-sm text-gray-600">Seller: Artel Market</p>

                <div className="flex gap-4 pt-2 justify-between md:justify-start ">
                    <RemoveAddToCartButton productId={product?.id}/>
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


                <div className="md:mt-5 flex justify-end md:justify-self-start">
                    <Link href={`/details/${product?.id}`}
                          className="text-gray-600 hover:text-blue-500 hover:underline">
                        Details
                    </Link>
                </div>
            </div>
            <div className="md:col-span-6 col-span-12">
                <AddToCartButton product={product} formCartPage={true}/>
            </div>
        </div>
    );
};

export default MyCartItemCard;