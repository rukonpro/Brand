import React from 'react';
import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/Footer/Footer";
import SavedForLaterItems from "@/app/components/SavedForLaterItems/SavedForLaterItems";
import CheckoutCard from "@/app/components/CheckoutCard/CheckoutCard";
import MyCartItems from "@/app/components/MyCartItems/MyCartItems";
const MyCart = () => {

    return (
        <div>
            <Navbar/>
            <div className='max-w-[1200px] mx-auto md:px-3 md:0 py-5'>
                <div>
                    <h1 className="text-xl font-bold px-3 md:px-0 pb-5">My Cart (5)</h1>
                </div>

                <div className="grid grid-cols-12 gap-4">
                    {/******************************My cart items*******************************/}
                    <MyCartItems/>


                    {/******************************Checkout Card*******************************/}
                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                       <CheckoutCard/>
                    </div>
                </div>

                {/******************************Saved ForLater Items*******************************/}
                <div className="md:bg-white md:p-5 mt-10 md:rounded-lg border-2">
                  <SavedForLaterItems/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default MyCart;