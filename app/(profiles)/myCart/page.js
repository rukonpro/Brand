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
            
                {/******************************My cart items*******************************/}
               <MyCartItemsLayout/>


                {/******************************checkout Card*******************************/}

           

            {/******************************Saved ForLater Items*******************************/}
            <div >
                <SavedForLaterItems/>
            </div>
        </div>
    );
};

export default MyCart;