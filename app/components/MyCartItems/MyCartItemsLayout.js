"use client"
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AppContext} from "@/app/context/BrandContext";
import {getProducts} from "@/app/utils/product/fetch_products_api";
import MyCartItems from "@/app/components/MyCartItems/MyCartItems";
import CheckoutCard from "@/app/components/CheckoutCard/CheckoutCard";
import Link from "next/link";

const MyCartItemsLayout = () => {
    const {cart,products,setProducts}=useContext(AppContext);
    const [loading,setLoading] = useState(false);
    const productIds = cart?.map(item => item.productId).join(',');

    const params = {
        limit: 10,
        page: 1,
        productIds: productIds
    }

    const handleGetProducts=useCallback(async ()=>{
        setLoading(true)
        if(productIds){
            const products= await getProducts(params);
            setProducts(products?.data);
        }

        setLoading(false);
    },[productIds,setProducts])


    useEffect(()=>{
        handleGetProducts()
    },[handleGetProducts]);




    let totalPrice = 0;
    let totalPriceWithDiscount = 0;
    let totalDiscount = 0;
    let totalTax = 0;
    const taxPercentage = 10; // Assuming a 10% tax rate

    cart.forEach((item) => {
        const originalPrice = item.product?.price;
        const discountPercentage = item?.product?.offers?.[0]?.discountValue || 0; // Check if there's a discount, otherwise 0
        const discountAmount = (originalPrice * discountPercentage) / 100;
        const discountedPrice = originalPrice - discountAmount;

        // Calculate the original total price
        totalPrice += originalPrice * item?.quantity;

        // Calculate total price with discounted price (if applicable)
        totalPriceWithDiscount += discountedPrice * item?.quantity;

        // Calculate the total discount for this item
        totalDiscount += discountAmount * item?.quantity;

        // Calculate the tax for this item (on the discounted price)
        totalTax += (discountedPrice * taxPercentage / 100) * item?.quantity;
    });

// Calculate the total price after applying the tax
    const totalPriceWithTax = totalPriceWithDiscount + totalTax;



    return (
        <>
            <MyCartItems products={products} loading={loading}/>

            <div className="col-span-12 sm:col-span-8 md:col-span-6 lg:col-span-4 ">
                <CheckoutCard
                    cart={cart}
                    products={products}
                    totalPrice={totalPrice}
                    totalPriceWithDiscount={totalPriceWithDiscount}
                    taxPercentage={taxPercentage}
                    totalPriceWithTax={totalPriceWithTax}
                    totalDiscount={totalDiscount}
                    totalTax={totalTax}

                >

                    <div className="pt-8">
                        {cart?.length!==0?
                            <Link href="/checkout"
                               type="button"
                               className={`text-xl ${cart.length === 0 ? "bg-green-200 text-slate-700" : "bg-green-500 text-white"} px-5 py-2 rounded-lg w-full inline-block text-center items-center`}
                        >Checkout
                        </Link>:
                            <button type="button"
                            disabled
                            className={`text-xl ${cart.length === 0?"bg-green-200 text-slate-700 cursor-not-allowed":"bg-green-500 text-white"}e px-5 py-2 rounded-lg w-full inline-block text-center items-center`}
                    >
                        Checkout
                    </button>
                    }
                    </div>
                </CheckoutCard>
            </div>

        </>
    );
};

export default MyCartItemsLayout;