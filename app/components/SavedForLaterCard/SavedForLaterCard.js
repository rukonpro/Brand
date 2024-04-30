import React from 'react';
import Image from "next/image";
import blueCartIcon from "@/public/images/blue-cart.png";

const SavedForLaterCard = ({product}) => {
    return (
        <div className="border-2 border-blue-200 rounded-lg p-5">
            <div>
                <Image src={product.image} alt={product.title}
                       className="w-full h-52 object-contain overflow-hidden"
                />
            </div>
            <h1 className="text-xl font-bold text-black pt-2">${product.price}</h1>
            <h2 className="text-gray-600 text-lg pt-2">GoPro HERO6 4K Action Camera -
                Black</h2>

            <button type="button" className="flex items-center gap-4 py-1 px-5 border-2 rounded-lg text-blue-600 mt-4">
                <Image src={blueCartIcon} alt="blue Cart Icon"/>
                Add to cart
            </button>
        </div>
    );
};

export default SavedForLaterCard;