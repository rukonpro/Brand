import React from 'react';
import Image from 'next/image';
import blueCartIcon from "@/public/images/blue-cart.png";

const AddToCartButton = ({id}) => {
    return (
        <button type="button"
            className="flex items-center gap-1 md:gap-x-4  py-1 px-5 border-2 rounded-lg text-blue-600 mt-4 w-full justify-center hover:border-blue-500 ">
            <Image src={blueCartIcon} alt="blue Cart Icon" />
            Add to cart
        </button>
    );
};

export default AddToCartButton;