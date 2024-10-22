"use client"
import React from 'react';
import CheckoutCard from "@/app/components/CheckoutCard/CheckoutCard";

import ShippingForm from "@/app/components/ShippingForm/ShippingForm";


import { useCart } from '@/app/context/CartContext';
const CheckoutLayout = () => {

    const { cart, mutate, isLoadingCart, user, userStatus } = useCart()


    const handleOrder = async () => {



    }


    return userStatus === "authenticated" && user?.email && (
        <div>

            <ShippingForm user={user} />


            <div className="pt-11">
                <CheckoutCard

                    cartSummary={cart?.cartSummary}
                    loading={isLoadingCart}

                >
                    <div className="pt-8">
                        <button
                            onClick={handleOrder}
                            type="button"
                            disabled={cart?.cartItems?.length < 1}
                            className={`text-xl  ${cart?.cartItems?.length < 1 ? "opacity-20" : "bg-green-500 text-white"}  px-5 py-2 rounded-lg w-full inline-block text-center items-center`}
                        >Order
                        </button>
                    </div>
                </CheckoutCard>
            </div>


        </div>
    );
};

export default CheckoutLayout;