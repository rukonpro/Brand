import React from 'react';
import Footer from "@/app/components/Footer/Footer";
import SavedForLaterItems from "@/app/components/SavedForLaterItems/SavedForLaterItems";
import CheckoutCard from "@/app/components/CheckoutCard/CheckoutCard";
import MyCartItems from "@/app/components/MyCartItems/MyCartItems";
const MyCart = () => {

    return (
        <div>
            <div>
                <div>
                    <h1 className="text-xl font-bold px-3 md:px-0 pb-5">My Cart (5)</h1>
                </div>

                <div className="grid grid-cols-12 gap-4">
                    {/******************************My cart items*******************************/}
                    <MyCartItems/>


                    {/******************************Checkout Card*******************************/}
                    <div className="col-span-12 md:col-span-4 lg:col-span-3 px-3">
                       <CheckoutCard/>
                    </div>
                </div>

                {/******************************Saved ForLater Items*******************************/}
                <div className="md:bg-white md:p-3 mt-10 md:rounded-r-lg">
                  <SavedForLaterItems/>
                </div>
            </div>
        </div>
    );
};

export default MyCart;