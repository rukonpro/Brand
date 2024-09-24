"use client"
import React, {useContext} from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import blueCartIcon from "@/public/images/blue-cart.png";
import {AppContext} from "@/app/context/BrandContext";



const AddToCartButton = ({product,formCartPage}) => {
    const { cart, setCart,products,setProducts } = useContext(AppContext);
    const id=product?.id;
    // Function to add item to cart
    const addToCart = (productId, quantity = 1) => {
        // Create a new cart array so we can update state without mutating
        const updatedCart = [...cart];

        // Check if the product already exists in the cart
        const existingProductIndex = updatedCart.findIndex((item) => item.productId === productId);

        if (existingProductIndex > -1) {
            // If the product is already in the cart, update the quantity
            updatedCart[existingProductIndex].quantity += quantity;
        } else {
            // If the product is new, add it to the cart
            updatedCart.push({product, productId, quantity });
        }

        // Update state
        setCart(updatedCart);


        // Save the updated cart to cookies (sync it back to cookies)
        Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7, sameSite: 'Lax' }); // 7 days expiry
    };



    // Function to decrement the quantity of an item in the cart
    const decrementQuantity = (productId) => {
        const updatedCart = [...cart];
        const existingProductIndex = updatedCart.findIndex((item) => item.productId === productId);

        if (existingProductIndex > -1) {
            if (updatedCart[existingProductIndex].quantity > 1) {
                // Decrease the quantity
                updatedCart[existingProductIndex].quantity -= 1;
            } else {
                // Remove the product from the cart if the quantity reaches 1 or less
                updatedCart.splice(existingProductIndex, 1);
                const updateProducts=products?.filter((item) => item.id !== productId);
                setProducts(updateProducts);
            }
        }
        setCart(updatedCart);
        Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7, sameSite: 'Lax' });
    };

    const cartProduct=cart?.find(item=>item?.productId === id);


    return (
        cartProduct===undefined ?
            <button
                onClick={() => addToCart(id)}
                type="button"
                className="flex items-center gap-1 md:gap-x-2  py-1  border-2 rounded-lg text-blue-600 mt-4 w-full justify-center hover:border-blue-500 dark:border-slate-700 dark:bg-slate-800">
                <Image src={blueCartIcon} alt="blue Cart Icon"/>
                {
                    formCartPage?null:"Add to cart"
                }

            </button> :
            <div
                className="flex items-center justify-between hover:border-blue-500  rounded-lg text-blue-600 font-bold mt-4 w-full border-2 overflow-hidden dark:border-slate-700">
                <button
                    onClick={() => decrementQuantity(id)}
                    type="button"
                    className="bg-red-500 py-1 w-full h-full  justify-center hover:bg-red-400 text-white">
                    -
                </button>
                <button
                    type="button"
                    className="  py-1 w-full h-full  justify-center dark:bg-slate-800">
                    {cartProduct?.quantity && `${cartProduct?.quantity}`}
                </button>
                <button
                    onClick={() => addToCart(id)}
                    type="button"
                    className=" bg-blue-500 text-white  py-1 w-full h-full  justify-center hover:bg-blue-400 ">
                    +
                </button>
            </div>
    );

};

export default AddToCartButton;