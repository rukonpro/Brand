import React from 'react';
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";
import removeFormLaterItemHandler from "@/app/components/SavedForLaterItems/removeFormLaterItemHandler";
import { IoCloseSharp } from "react-icons/io5";
const SavedForLaterCard = ({product,getHandler}) => {
    return (
        <div className="lg:border-2 border-blue-200 md:rounded-lg p-3 bg-white dark:bg-slate-700 dark:border-slate-700 relative">
            <button
                type="button"
                className="text-red-500  absolute right-0 top-0 z-10"
                onClick={() => {
                    removeFormLaterItemHandler(product?.id);
                    getHandler();
                }}
            >
                <IoCloseSharp size={25}/>
            </button>
            <Link href={`/details/${product?.id}`}>
                <div>
                    {product?.photos?.[0] ? <Image
                        src={product?.photos?.[0]}
                        alt={product.name}
                        height={300}
                        width={300}
                        className="w-full h-28 md:h-36 object-contain overflow-hidden"
                    /> : null}
                </div>
                <h1 className="text-xl font-bold text-black pt-2 dark:text-slate-50 truncate hover:text-clip">${product.name}</h1>
                <p className="text-xl font-bold text-blue-500 pt-2 ">${product.price}</p>


                {product?.colors?.length > 0 && <h2 className="text-gray-600 text-sm pt-2 dark:text-slate-300">
                    {product?.colors?.map(color => (
                        <span>{color}</span>
                    ))}
                </h2>}
            </Link>

            <AddToCartButton product={product}/>
        </div>
    );
};

export default SavedForLaterCard;