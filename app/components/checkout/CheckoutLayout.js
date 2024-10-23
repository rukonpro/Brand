"use client"
import React, { Suspense, useState } from 'react';
import CheckoutCard from "@/app/components/CheckoutCard/CheckoutCard";

import ShippingForm from "@/app/components/ShippingForm/ShippingForm";
import { MdAddLocationAlt } from "react-icons/md";
import cta3 from "@/public/images/cta3.svg"
import { useCart } from '@/app/context/CartContext';
import CartItemSkeleton from '../Skeletons/CartItemSkeleton';
import MyCartItems from '../MyCartItems/MyCartItems';
import Image from 'next/image';
import CheckoutSkeleton from '../Skeletons/CheckoutSkeleton';
import Modal from '../Drawer/Modal';
import ShippingBillingCard from '../ShippingBilling/ShippingBillingCard';
import ShippingBillingSkeleton from '../Skeletons/ShippingBillingSkeleton';
import { fetcher } from '@/app/utils/fetcher/fetcher';
import useSWR from 'swr';
import Drawer2 from '../Drawer/Drawer2';
import ShippingAddress from '../ShippingAddress/ShippingAddress';
import AddressTabs from '../AddressTabs/AddressTabs';

const CheckoutLayout = () => {
    const { cart, mutate, isLoadingCart, user, userStatus } = useCart();
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const [isOpenDrawer2, setIsOpenDrawer2] = useState(false);

    const toggleDrawer2 = () => {
        setIsOpenDrawer2(!isOpenDrawer2);
    };



    const {
        data: defualtShippingAdress,
        isLoading: isLoadingDefualtShippingAdress,
        mutate: mutateDefualtShippingAdresss
    } = useSWR(`/api/shippingAddress/findDefaultAddress`, fetcher);




    const handleOrder = async () => {



    }


    return userStatus === "authenticated" && user?.email && (
        <div>
            <Modal isOpen={isModalOpen}
                onClose={closeModal}
                title="Shipping Address">
                 <AddressTabs
                 shippingComponent={
                    <ShippingForm user={user} onClose={closeModal} />
                 }
                 />
               
            </Modal>


            <Drawer2 isOpen={isOpenDrawer2}
                setIsOpen={setIsOpenDrawer2}
                title="Shipping & Address">

                <AddressTabs
                    shippingComponent={
                        <ShippingAddress
                            toggleDrawer2={toggleDrawer2}
                            mutateDefualtShippingAdresss={mutateDefualtShippingAdresss}
                            openModal={openModal}
                        />}
                    billingComponent={
                        <ShippingAddress
                            toggleDrawer2={toggleDrawer2}
                            mutateDefualtShippingAdresss={mutateDefualtShippingAdresss}
                            openModal={openModal}
                        />}
                />


            </Drawer2>



            <div
                className='flex justify-end px-3 md:px-0 '>
                <button
                    onClick={openModal}
                    className='border-2 p-2 rounded-lg border-blue-300  hover:border-blue-500 flex items-center gap-2'>
                    <MdAddLocationAlt size={25} /> New address</button>
            </div>



            <AddressTabs
                shippingComponent={
                    <Suspense fallback={<ShippingBillingSkeleton />}>
                        {isLoadingDefualtShippingAdress ?
                            <ShippingBillingSkeleton /> :
                            <ShippingBillingCard
                                title="Shipping address"
                                toggleDrawer2={toggleDrawer2}
                                address={defualtShippingAdress} />}
                    </Suspense>
                }

                billingComponent={<Suspense fallback={<ShippingBillingSkeleton />}>
                    {isLoadingDefualtShippingAdress ?
                        <ShippingBillingSkeleton /> :
                        <ShippingBillingCard
                            title="Billing address"
                            toggleDrawer2={toggleDrawer2}
                            address={defualtShippingAdress} />}
                </Suspense>}

            />



            <div className="grid grid-cols-12 gap-4 mt-5">

                <Suspense fallback={<CartItemSkeleton />}>
                    <div className="col-span-12 md:col-span-12 lg:col-span-8 overflow-hidden sm:rounded-lg md:rounded-r-lg md:bg-white dark:bg-slate-800">
                        {isLoadingCart ? <CartItemSkeleton /> :

                            cart?.cartItems?.length > 0 ?
                                <MyCartItems cartItems={cart?.cartItems} mutate={mutate} /> :
                                <div className="flex items-center justify-center w-full h-full relative">
                                    <Image src={cta3} alt="Cta" width={300} height={300} className='w-full h-full' />
                                    <h1 className=" text-blue-500 font-bold text-2xl absolute top-5">Please add to Cart</h1>
                                </div>
                        }
                    </div>
                </Suspense>

                <div className="col-span-12  lg:col-span-4 ">
                    <Suspense fallback={<CheckoutSkeleton />}>
                        {isLoadingCart ? <CheckoutSkeleton /> :
                            <CheckoutCard
                                cartSummary={cart?.cartSummary}
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
                            </CheckoutCard>}
                    </Suspense>
                </div>
            </div>
        </div >
    );
};

export default CheckoutLayout;