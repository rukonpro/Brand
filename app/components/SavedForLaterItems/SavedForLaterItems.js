"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import SavedForLaterCard from "@/app/components/SavedForLaterCard/SavedForLaterCard";
import empty_cart from "@/public/images/undraw_empty_cart_co35.svg";
import Image from "next/image";
import SavedForLaterSkeleton from "../Skeletons/SavedForLaterSkeleton";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const SavedForLaterItems = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
    });
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const limit=8;
    const fetchSavedItems = useCallback(
        async (page = 1) => {
            if (status !== "authenticated") return;
            setIsLoading(true);
            try {
                const response = await fetch(
                    `/api/saveForLater/save-for-later?limit=${limit}&page=${page}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (!response.ok) throw new Error("Failed to fetch saved items");
                const result = await response.json();
                // Append new products if not the first page
                setProducts((prev) =>
                    page === 1 ? result?.data : [...prev, ...result?.data]
                );
                setPagination({
                    currentPage: result?.pagination?.currentPage,
                    totalPages: result?.pagination?.totalPages,
                    hasNextPage: result?.pagination?.hasNextPage,
                });
            } catch (error) {
                toast.error("Failed to load saved items");
            } finally {
                setIsLoading(false);
            }
        },
        [status]
    );

    // Delete product from SaveForLater
    const handleDeleteForLater = async (saveId) => {
        if (status !== "authenticated") {
            toast.error("Please sign in to remove items");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch("/api/saveForLater/save-for-later", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: saveId }),
            });
            const result = await response.json();
            if (response.ok) {
                const resetProducts = products.filter(
                    (product) => product.id !== saveId
                );
                setProducts(resetProducts);
                toast.success("Item removed from saved list!");
            } else {
                toast.error(result.error || "Failed to remove item");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    // Load more products
    const handleLoadMore = () => {
        if (pagination.hasNextPage) {
            fetchSavedItems(pagination.currentPage + 1);
        }
    };

    // Fetch saved items on mount or when session changes
    useEffect(() => {
        fetchSavedItems(1);
    }, [fetchSavedItems]);

    return (
        <div className="mt-10">
            <Suspense fallback={<SavedForLaterSkeleton limit={limit} />}>
                {isLoading && products.length === 0 ? (
                    <SavedForLaterSkeleton limit={limit}/>
                ) : (
                    <div className="lg:bg-white md:p-3 md:rounded-r-lg dark:bg-slate-800">
                        <h1 className="text-xl font-bold text-gray-600 pb-5 px-3 md:px-0 dark:text-slate-200">
                            Saved for later
                        </h1>
                        <div>
                            {products?.length > 0 ? (
                                <div>
                                    <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-0.5 md:gap-1 lg:gap-2">
                                        {products?.map((item) => (
                                            <li key={item?.id}>
                                                <SavedForLaterCard
                                                    product={item?.product}
                                                    handleDeleteForLater={handleDeleteForLater}
                                                    id={item?.id}
                                                />
                                            </li>
                                        ))}
                                    </ol>
                                    {pagination.hasNextPage && (
                                        <div className="flex justify-center mt-6">
                                            <button
                                                onClick={handleLoadMore}
                                                disabled={isLoading}
                                                className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                                                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                            >
                                                {isLoading ? "Loading..." : "Load More"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="h-56 flex justify-center items-center">
                                    <Image
                                        src={empty_cart}
                                        alt="empty_cart"
                                        height={300}
                                        width={300}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Suspense>
        </div>
    );
};

export default SavedForLaterItems;