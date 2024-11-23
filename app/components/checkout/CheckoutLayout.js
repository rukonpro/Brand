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
import { postOrder } from '@/app/utils/order/fetch_order_api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { deleteManyCartItemApi } from '@/app/utils/cart/fetch_cart_api';


const CheckoutLayout = () => {
    const { cart, mutate, isLoadingCart, user, userStatus } = useCart();
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const [isOpenDrawer2, setIsOpenDrawer2] = useState(false);
    const [isOrderLoading, setIsOrderLoading] = useState(false);
    const router = useRouter()
    const toggleDrawer2 = () => {
        setIsOpenDrawer2(!isOpenDrawer2);
    };

    const {
        data: shippingAddress,
        isLoading: isLoadingShippingAddress,
        mutate: mutateShippingAddress
    } = useSWR(`/api/shippingAddress/findMany`, fetcher);

    const {
        data: defualtShippingAdress,
        isLoading: isLoadingDefualtShippingAdress,
        mutate: mutateDefualtShippingAdresss
    } = useSWR(`/api/shippingAddress/findDefaultAddress`, fetcher);



    const handleOrder = async () => {
        const data = {
            orderItems: cart?.cartItems,
            orderSummery: cart?.cartSummary,
            userId: user?.id,
            shippingAddressId: defualtShippingAdress?.id,
            billingAddressId: defualtShippingAdress?.id
        }

        setIsOrderLoading(true);
        const res = await postOrder(data);
        setIsOrderLoading(false)
        if (res?.status === 201) {
            toast.success(res?.data?.message, {
                id: "order",
                position: "bottom-center"
            });
            await deleteManyCartItemApi({ userId: user?.id });
            mutate();
            router.push(`/orderSuccess?orderId=${res?.data?.order?.id}&userId=${user?.id}`)
        }
        else if (res?.status === 400 || res?.status === 500 || res?.status === 405) {
            toast.error(res?.message, {
                id: "order",
                position: "bottom-center"
            })
        }
        else {
            toast.error("Internal error,please try again!", {
                id: "order",
                position: "bottom-center"
            })
        }
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
                            shippingAddress={shippingAddress}
                            isLoadingShippingAddress={isLoadingShippingAddress}
                            mutateShippingAddress={mutateShippingAddress}
                            mutateDefualtShippingAdresss={mutateDefualtShippingAdresss}
                            openModal={openModal}
                        />}
                    billingComponent={
                        <ShippingAddress
                            toggleDrawer2={toggleDrawer2}
                            shippingAddress={shippingAddress}
                            isLoadingShippingAddress={isLoadingShippingAddress}
                            mutateShippingAddress={mutateShippingAddress}
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
                                        disabled={isOrderLoading || cart?.message === "Cart is empty"}
                                        className={` ${isOrderLoading || cart?.message === "Cart is empty" ? "opacity-20" : "opacity-100"} bg-green-500 text-white  text-xl  px-5 py-2 rounded-lg w-full inline-block text-center items-center`}
                                    >{isOrderLoading ? "Processing..." : "Order"}
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