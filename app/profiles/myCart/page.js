import React from 'react';
import SavedForLaterItems from "@/app/components/SavedForLaterItems/SavedForLaterItems";
import CheckoutCard from "@/app/components/CheckoutCard/CheckoutCard";
import MyCartItems from "@/app/components/MyCartItems/MyCartItems";
const MyCart = () => {

    return (
        <div>
            <div>
                <h1 className="text-xl font-bold px-3 md:px-0 pb-5">My Cart (5)</h1>
            </div>

            <div className="grid grid-cols-12 gap-4">
                {/******************************My cart items*******************************/}
                <MyCartItems/>


                {/******************************Checkout Card*******************************/}
                <div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 ">
                    <CheckoutCard/>
                </div>
            </div>

            {/******************************Saved ForLater Items*******************************/}
            <div className="lg:bg-white md:p-3 mt-10 md:rounded-r-lg">
                <SavedForLaterItems/>
            </div>
        </div>
    );
};

export default MyCart;