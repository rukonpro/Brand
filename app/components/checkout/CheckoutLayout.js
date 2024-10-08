"use client"
import React, {useCallback, useContext, useEffect, useState} from 'react';
import CheckoutCard from "@/app/components/CheckoutCard/CheckoutCard";
import {AppContext} from "@/app/context/BrandContext";
import {getProducts} from "@/app/utils/product/fetch_products_api";
import ShippingForm from "@/app/components/ShippingForm/ShippingForm";
import Loader from "@/app/Loader";
import findManyShippingAdressApi from "@/app/utils/shippingAdress/findManyShippingAdressApi";
import toast from "react-hot-toast";
import ShippingCard from "@/app/components/checkout/ShippingCard";
import {useSession} from "next-auth/react";
import {postOrder} from "@/app/utils/order/fetch_order_api";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
const CheckoutLayout = () => {
    const {cart,setCart,products,setProducts,}=useContext(AppContext);
    const [shippingAddresses,setShippingAddresses] = useState({
        addresses:[],
        pagination:{}
    })
    const {data:userData,status:userStatus}=useSession();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading,setLoading] = useState(false);

    const [sippingLoading,setShippingLoading]=useState(false);

    const [newAddress,setNewAddress]=useState(false);
    const productIds = cart?.map(item => item.productId).join(',');

    const user=userData?.user;
    const router = useRouter();

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






    const handleOrder= async ()=>{

        const newCart=await cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));


        if (newCart?.[0]?.productId&&shippingAddresses?.addresses?.[0]?.id&&user?.id){
            const res=await postOrder({
                userId:user?.id,
                shippingAddressId:shippingAddresses?.addresses?.[0]?.id,
                items:newCart
            });

            if (res.status===201){
                toast.success("Order successfully")
                setCart([]);
                setProducts([]);
                Cookies.remove('cart');
                router.push(`/orderSuccess?orderId=${res?.data?.id}&${res?.data?.userId}`);
            }
            if (res?.data?.error?.message){
                toast.error(res?.data?.error?.message,{
                    id:"order",
                })
            }
        }

    }


    useEffect(()=>{
        handleGetProducts()
    },[handleGetProducts]);







    const getShippingAddresses=async ()=>{
        const params={
            page:currentPage,
            limit:1,

        }
        const res=await findManyShippingAdressApi(params);

        if (res?.status===200){
            setShippingAddresses(res?.data);
        }
        if(res?.data?.error){
            toast.error(res?.data?.error,{id: 'shipping'});
        }

    }

    useEffect(()=>{

        if (userStatus!=="loading"){
            setShippingLoading(true)


            getShippingAddresses()
            setShippingLoading(false)

        }

    },[userStatus,currentPage]);


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
        <div>

            {sippingLoading||userStatus === 'loading'?<Loader/>:

                newAddress?<ShippingForm setNewAddress={setNewAddress} getShippingAddresses={getShippingAddresses}/>:
               ( shippingAddresses?.addresses?.length>0 ?
                    <ShippingCard
                        setNewAddress={setNewAddress}
                        shippingAddress={shippingAddresses}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />:
                   !sippingLoading&&
                   !shippingAddresses?.addresses?.length>0 &&
                   user?.id&&<ShippingForm user={user} getShippingAddresses={getShippingAddresses}/>)
            }
            {
                user?.id &&
                <div className="pt-11">
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
                            <button
                                onClick={handleOrder}
                                type="button"
                                    disabled={cart.length === 0}
                                    className={`text-xl  ${cart.length === 0?"bg-green-200 text-slate-700":"bg-green-500 text-white"}  px-5 py-2 rounded-lg w-full inline-block text-center items-center`}
                            >Order
                            </button>
                        </div>
                    </CheckoutCard>
                </div>
            }

        </div>
    );
};

export default CheckoutLayout;