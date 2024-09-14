import React from 'react';
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";
import removeFormLaterItemHandler from "@/app/components/SavedForLaterItems/removeFormLaterItemHandler";

const SavedForLaterCard = ({product,getHandler}) => {
    return (
        <div className="lg:border-2 border-blue-200 md:rounded-lg p-3 bg-white">
            <Link href={`/details/${product?.id}`}>
                <div>
                    {product?.photos?.[0]?<Image
                        src={product?.photos?.[0]}
                        alt={product.name}
                        height={300}
                        width={300}
                        className="w-full h-28 md:h-36 object-contain overflow-hidden"
                    />:null}
                </div>

                <h1 className="text-xl font-bold text-black pt-2">${product.price}</h1>


                <h2 className="text-gray-600 text-sm pt-2">GoPro HERO6 4K Action Camera -
                    Black</h2>
            </Link>
            <button
                onClick={() => {
                    removeFormLaterItemHandler(product?.id);
                    getHandler();
                }}
                type="button"
                className="rounded text-red-500 font-bold text-sm py-0 px-1 border border-white  hover:underline"
            >

                {/*<Image src={RemoveIcon} height={18} width={18} alt="remove icon"/>*/}
                Unsaved for later
            </button>
            <AddToCartButton product={product}/>
        </div>
    );
};

export default SavedForLaterCard;