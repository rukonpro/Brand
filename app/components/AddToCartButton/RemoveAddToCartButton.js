"use client"
import { deleteSingleCartItemApi } from '@/app/utils/cart/fetch_cart_api';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { AiOutlineClose } from "react-icons/ai";
const RemoveAddToCartButton = ({ itemId, mutate }) => {
    const [loading, setLoading] = useState(false);
    const { data: userData } = useSession();
    const user = userData?.user;


    const params = {
        userId: user?.id,
        itemId: itemId
    }

    const handleItemRemoveToCart = async () => {
        setLoading(true);
        const res = await deleteSingleCartItemApi(params);
        if (res?.status === 200) {
            mutate();
            toast.success(res?.data?.message, {
                id: "cart",
                position: "bottom-center"
            })
        } else if (res?.status === 500) {
            toast.error(res?.data?.message, {
                id: "cart",
                position: "bottom-center"
            })
        }

        else if (res?.status === 404) {
            toast.error(res?.data?.message, {
                id: "cart",
                position: "bottom-center"
            })
        }

        else if (res?.status === 405) {
            toast.error(res?.data?.message, {
                id: "cart",
                position: "bottom-center"
            })
        }
        else if (res?.status === 403) {
            toast.error(res?.data?.message, {
                id: "cart",
                position: "bottom-center"
            })
        }
        setLoading(false);
    }

    return (
        <button
            onClick={handleItemRemoveToCart}
            type="button"
            disabled={loading}
            className={`rounded text-red-500 font-bold text-sm ${loading ? "opacity-20" : ""}`}
        >

            <AiOutlineClose size={25} />
        </button>
    );
};

export default RemoveAddToCartButton;