import React from 'react';
import SavedForLaterItems from "@/app/components/SavedForLaterItems/SavedForLaterItems";
import BackButton from "@/app/components/BackButtons/BackButton";
import MyCartItemsLayout from "@/app/components/MyCartItems/MyCartItemsLayout";


export const metadata = {
    title: "My Cart - Brand",
    description: "Review your selected items in the cart at Brand. Adjust quantities, remove items, and proceed to secure checkout for a seamless shopping experience.",
};
const MyCart = () => {



    return (
        <div>
            <div className="flex justify-between items-center pb-5 px-3 md:px-0">
                <h1 className="text-xl font-bold">My Cart</h1>
                <BackButton title="Back" />
            </div>

            <div className="grid grid-cols-12 gap-4">
                {/******************************My cart items*******************************/}
               <MyCartItemsLayout/>


                {/******************************checkout Card*******************************/}

            </div>

            {/******************************Saved ForLater Items*******************************/}
            <div >
                <SavedForLaterItems/>
            </div>
        </div>
    );
};

export default MyCart;