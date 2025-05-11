"use client"
import React, {Suspense, useCallback, useEffect, useState} from 'react';
import SavedForLaterCard from "@/app/components/SavedForLaterCard/SavedForLaterCard";
import empty_cart from "@/public/images/undraw_empty_cart_co35.svg"
import Image from 'next/image';
import SavedForLaterSkeleton from '../Skeletons/SavedForLaterSkeleton';
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";

const SavedForLaterItems = () => {
    const [products, setProducts] = useState([]);
    const { data: session, status } = useSession(); // Get user session
    const [isLoading, setIsLoading] = useState(false);

    const fetchSavedItems = useCallback(async () => {
        setIsLoading(true);
        if (status !== "authenticated") return; // Skip if not authenticated
        try {
            const response = await fetch('/api/saveForLater/save-for-later?limit=2 && page=1',{
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) throw new Error("Failed to fetch saved items");
            const result=  await response.json();
            setProducts(result?.data);
        } catch (error) {
            toast.error("Failed to load saved items");
        }
        finally {
            setIsLoading(false);
        }
    }, [status]);


    // Delete product from SaveForLater
    const handleDeleteForLater = async (saveId) => {
        if (status !== "authenticated") {
            toast.error("Please sign in to remove items");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch('/api/saveForLater/save-for-later', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id: saveId }),

            })
            const result = await response.json();
            if (response.ok) {
                const resetProducts = products.filter(product => product.id !== saveId);
                setProducts(resetProducts);

                toast.success("Item removed from saved list!");
            } else {
                toast.error(result.error || "Failed to remove item");
            }
        }catch (error) {
            toast.error("An error occurred");
        }finally {
            setIsLoading(false);
        }
    };



    // Fetch saved items on mount or when session changes
    useEffect(() => {
        fetchSavedItems();
    }, [fetchSavedItems]);


    return (
        <div className="mt-10">
            <Suspense fallback={<SavedForLaterSkeleton />} >

                {isLoading ? <SavedForLaterSkeleton /> :
                    <div className="lg:bg-white md:p-3  md:rounded-r-lg dark:bg-slate-800">
                        <h1 className="text-xl font-bold text-gray-600 pb-5 px-3 md:px-0 dark:text-slate-200">Saved for later</h1>
                        <div>
                            {!isLoading && products?.length > 0 ? <ol
                                className="grid grid-cols-2  sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-0.5 md:gap-1 lg:gap-2">
                                {
                                    products?.map((item) => {
                                        return (
                                            <li key={item?.id}>

                                                <SavedForLaterCard product={item?.product} handleDeleteForLater={handleDeleteForLater} id={item?.id}/>

                                            </li>
                                        )
                                    })
                                }
                            </ol> :
                                <div className="h-56 flex justify-center items-center">
                                    <Image src={empty_cart} alt='empty_cart' height={300} width={300} />

                                </div>
                            }
                        </div>
                    </div>}
            </Suspense>
        </div>
    );
};

export default SavedForLaterItems;