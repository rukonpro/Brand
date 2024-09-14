"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import loveIconOutline from "@/public/images/loveIconOutline.png";
import saveForLaterIterHandler from "@/app/components/SavedForLaterItems/saveForLaterIterHandler";
import getSavedProductsFromCookies from "@/app/components/SavedForLaterItems/getSavedProductsFromCookies";
import removeProductFromCookies from "@/app/components/SavedForLaterItems/removeFormLaterItemHandler";

const SaveForLaterButton = ({product}) => {
    const [products, setProducts] = useState([]);
    const isSaved=products?.find(p=>p?.id===product?.id);
    const getHandler=()=>{
    const savedProducts = getSavedProductsFromCookies();
    setProducts(savedProducts);
}
    useEffect(() => {
        getHandler()
    }, []);

    return (
        <button
            onClick={()=> {
                !isSaved?saveForLaterIterHandler(product):removeProductFromCookies(product.id)

                getHandler()
            }}
            className="w-full  py-1 text-blue-500   mt-2 flex justify-center items-center gap-4  hover:border-blue-500 hover:border-2 border-2 border-white rounded-lg ">
            <Image src={loveIconOutline} alt="loveIconOutline" className="h-4 w-4"/>
            <span>{isSaved?'Unsaved for later':'Save for later'}</span>
        </button>
    );
};

export default SaveForLaterButton;