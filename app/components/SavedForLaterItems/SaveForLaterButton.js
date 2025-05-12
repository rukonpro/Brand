"use client"
import React, {useCallback, useEffect, useState} from 'react';
import Image from "next/image";
import favorite_outlined from "@/public/images/favorite_outlined.svg";
import favorite_filled from  "@/public/images/favorite_filled.svg";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";


const SaveForLaterButton = ({product}) => {
    const { data: session, status } = useSession(); // Get user session
    const [isSaved, setIsSaved] = useState(false); // Track if product is saved
    const [isLoading, setIsLoading] = useState(false); // Track API loading state


    const fetchSavedItems = useCallback(async () => {
        if (status !== "authenticated") return; // Skip if not authenticated
        try {
            const response = await fetch('/api/saveForLater/save-for-later',{
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) throw new Error("Failed to fetch saved items");
            const result=  await response.json();
            const saved = result?.data.some((item) => item?.productId === product?.id);
            setIsSaved(saved);
        } catch (error) {
            toast.error("Failed to load saved items");
        }
    }, [product.id, status]);


    // Save product to SaveForLater
    const handleSaveForLater = async () => {
        if (status !== "authenticated") {
            toast.error("Please sign in to save items");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch('/api/saveForLater/save-for-later', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id }),
            });
            const result = await response.json();
            if (response.ok) {
                setIsSaved(true)
                toast.success('Item saved for later!');
            } else {
                toast.error(result.error || 'Failed to save item');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

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
                setIsSaved(false);
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


// Find SaveForLater ID for deletion
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getSaveId = async () => {
        if (status !== "authenticated") return;
        try {
            const response = await fetch('/api/saveForLater/save-for-later',{
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) throw new Error("Failed to fetch saved items");
            const result =  await response.json();
            const savedItem = result?.data.find((item) => item?.productId === product?.id);
            return savedItem?.id;
        } catch (error) {
            return null;
        }
    };

    // Handle button click
    const handleClick = async () => {
        if (isLoading) return; // Prevent multiple clicks
        if (isSaved) {
            const saveId = await getSaveId();
            if (saveId) {
                await handleDeleteForLater(saveId);
            } else {
                toast.error("Saved item not found");
            }
        } else {
            await handleSaveForLater();
        }
    };

    // Fetch saved items on mount or when session changes
    useEffect(() => {
        fetchSavedItems();
    }, [fetchSavedItems]);


    return (
        <button
            onClick={handleClick}
            className="w-full  py-1 px-2 text-blue-500   mt-2 flex justify-center items-center gap-4  hover:border-blue-500 hover:border-2 border-2 border-white rounded-lg dark:border-slate-700 ">
            <Image src={isSaved ? favorite_filled: favorite_outlined} alt="loveIconOutline" className="h-4 w-4"/>

        </button>
    );
};

export default SaveForLaterButton;