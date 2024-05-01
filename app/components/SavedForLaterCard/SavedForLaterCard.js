import React from 'react';
import Image from "next/image";
import blueCartIcon from "@/public/images/blue-cart.png";

const SavedForLaterCard = ({product}) => {
    return (
        <div className="md:border-2 border-blue-200 md:rounded-lg p-3 md:p-5 bg-white">
            <div>
                <Image src={product.image} alt={product.title}
                       className="w-full h-36 md:h-52 object-contain overflow-hidden"
                />
            </div>
            <h1 className="text-xl font-bold text-black pt-2">${product.price}</h1>
            <h2 className="text-gray-600 text-sm md:text-lg pt-2">GoPro HERO6 4K Action Camera -
                Black</h2>

            <button type="button" className="flex items-center gap-1 md:gap-4 py-1 px-3 border-2 rounded-lg text-blue-600 mt-4">
                <Image src={blueCartIcon} alt="blue Cart Icon"/>
                Add to cart
            </button>
        </div>
    );
};

export default SavedForLaterCard;