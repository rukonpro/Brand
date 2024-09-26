import React from 'react';
import Image from "next/image";
import Link from "next/link";
import SaveIcon from "@/public/images/save-icon.svg";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";
import RemoveAddToCartButton from "@/app/components/AddToCartButton/RemoveAddToCartButton";
import { FaSave } from "react-icons/fa";
const MyCartItemCard = ({product}) => {
    return (
        <div className="grid grid-cols-12  md:gap-4 p-3 border-b bg-white dark:bg-slate-700 dark:border-slate-700 relative">
           <div className="absolute top-0 right-0 ">
               <RemoveAddToCartButton productId={product?.id}/>
           </div>
            <div className="col-span-12 md:col-span-2">
                <Image
                    src={product?.photos?.[0]}
                    alt={product?.name}
                    height={100}
                    width={100}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="col-span-12 md:col-span-8  pt-5">
                <h1 className="text-lg font-bold truncate hover:text-clip">{product?.name}</h1>
                <p className="text-sm text-gray-600 py-1 dark:text-slate-300">
                    {product?.sizes?.length > 0 &&<span className="font-bold">Sizes: </span>}
                    {
                        product?.sizes?.length > 0 && product?.sizes?.map((size,index) => (<span key={index}>{size}, </span>))
                    }

                    { product?.sizes?.length > 0 && <span className="font-bold">Colors: </span>}
                    {
                        product?.sizes?.length > 0 && product?.colors?.map((color,index) => (<span key={index}>{color}, </span>))
                    }
                    {product?.material && <span className="font-bold"> Material: {product?.material}</span>}
                </p>
                <p className="text-sm text-gray-600 dark:text-slate-300 ">Description: {product?.description?.slice(0,100)}</p>

                <div className="flex gap-4 pt-2 justify-between md:justify-start ">

                    <button
                        className="border-2 dark:border-slate-600 rounded text-blue-500 font-bold text-sm py-0.5 px-2"
                    >
                        <FaSave size={25}/>
                    </button>
                </div>
            </div>
            <div className="col-span-12 md:col-span-2 grid grid-cols-3 md:grid-cols-none items-center gap-4">

                <div>
                    <p className="py-3">${product.price}</p>
                </div>


                <div className="md:mt-5 flex justify-end md:justify-self-start">
                    <Link href={`/details/${product?.id}`}
                          className="text-gray-600 hover:text-blue-500 hover:underline dark:text-slate-300">
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