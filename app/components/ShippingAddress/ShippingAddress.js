import { useCart } from "@/app/context/CartContext";
import { fetcher } from "@/app/utils/fetcher/fetcher";
import updateDefaultShppingAddress_Api from "@/app/utils/shippingAdress/updateDefaultShppingAddress_Api";
import React, { useState, useEffect, Suspense } from "react";
import toast, { ToastBar, ToastIcon } from "react-hot-toast";
import { GiCheckMark } from "react-icons/gi";
import useSWR from "swr";
import AddressSkeleton from "../Skeletons/AddressSkeleton";

export default function ShippingAddress({ toggleDrawer2, mutateDefualtShippingAdresss, openModal }) {
    const [selectAddress, setSelectAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const {
        data: shippingAddress,
        isLoading: isLoadingShippingAddress,
        mutate: mutateShippingAddress
    } = useSWR(`/api/shippingAddress/findMany`, fetcher);



    // ডিফল্ট ঠিকানা সিলেক্ট করা
    useEffect(() => {
        const defaultAddress = shippingAddress?.addresses?.find(address => address?.isDefault);
        if (defaultAddress) {
            setSelectAddress(defaultAddress?.id);
        }
    }, [shippingAddress]);

    const handleUpdateDefaultAddress = async () => {
        setLoading(true);
        const res = await updateDefaultShppingAddress_Api({ addressId: selectAddress });

        if (res?.status === 200) {
            toast.success(res?.data?.message, {
                id: "address",
                position: "bottom-center"
            });
            mutateShippingAddress();
            mutateDefualtShippingAdresss()
            toggleDrawer2()
        }
        else if (res?.status === 401 || res?.status === 400) {
            toast.error(res?.data?.message, {
                id: "address",
                position: "bottom-center"
            })
        }
        else {
            toast.error("Internal error, Please try again!", {
                id: "address",
                position: "bottom-center"
            })
        }
        setLoading(false);
    }



    return (
        <div className="max-w-md mx-auto bg-white rounded-lg dark:bg-slate-800">
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => {
                        openModal()
                        toggleDrawer2()
                    }}
                    className="text-blue-600 text-sm hover:underline">
                    Add new address
                </button>
            </div>

            <Suspense fallback={<AddressSkeleton />}>
                {
                    isLoadingShippingAddress ? <AddressSkeleton /> :
                        <ul>
                            {shippingAddress?.addresses?.map(address => (
                                <li key={address?.id} className="flex gap-5 my-1 p-4 border rounded-md border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-slate-900">
                                    <div className={`bg-blue-500 h-7 w-7 rounded-full p-1 text-white flex justify-center items-center
                ${selectAddress === address?.id ? "opacity-100" : "opacity-20"}`}>
                                        <GiCheckMark size={25} />
                                    </div>
                                    <div>
                                        <h4 className="text-md font-semibold text-gray-800 dark:text-gray-100">
                                            {address?.firstName} {address?.lastName} &nbsp;
                                            <span className="text-gray-500 dark:text-gray-300 text-sm">{address?.phoneNumber}</span>
                                        </h4>
                                        <div className="flex items-center justify-start mb-2">
                                            <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs rounded-full mr-2">
                                                HOME
                                            </span>
                                            <span className="text-gray-800 dark:text-gray-100 text-md">{address?.state}</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                                            Region: {address?.state} - {address?.houseNumber}  - {address?.city} -{address?.postalCode} - {address?.country}
                                        </p>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setSelectAddress(address?.id)}
                                                className={`px-2 py-1 text-sm bg-blue-50 text-blue-500 border border-blue-500 rounded hover:bg-blue-100 dark:bg-slate-900 dark:text-blue-300`}>
                                                Default Shipping Address
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                }

            </Suspense>


            <div className="mt-4 flex justify-end space-x-2">
                <button
                    onClick={toggleDrawer2}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600">
                    Cancel
                </button>
                <button
                    onClick={handleUpdateDefaultAddress}
                    disabled={loading}
                    className={`px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 ${loading ? "opacity-50" : ""}`}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}
