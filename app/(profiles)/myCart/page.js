import React from 'react';
import SavedForLaterItems from "@/app/components/SavedForLaterItems/SavedForLaterItems";
import BackButton from "@/app/components/BackButtons/BackButton";
import MyCartItemsLayout from "@/app/(profiles)/myCart/MyCartItemsLayout";



const MyCart = () => {



    return (
        <div>
            <div className="flex justify-between items-center pb-5 px-3 md:px-0">
                <h1 className="text-xl font-bold">My Cart (5)</h1>
                <BackButton title="Back" />
            </div>

            <div className="grid grid-cols-12 gap-4">
                {/******************************My cart items*******************************/}
               <MyCartItemsLayout/>


                {/******************************Checkout Card*******************************/}

            </div>

            {/******************************Saved ForLater Items*******************************/}
            <div >
                <SavedForLaterItems/>
            </div>
        </div>
    );
};

export default MyCart;