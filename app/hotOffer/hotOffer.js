"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { getOffers } from "@/app/utils/offer/fetch_offer_api";
import Link from "next/link";
import Image from "next/image";
import debounce from "lodash/debounce";

const HotOffer = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const pageSize = 12;

    // Debounced fetchOffers to prevent rapid API calls
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchOffers = useCallback(
        debounce(async (pageNum) => {
            try {
                setLoading(true);
                const data = await getOffers({ page: pageNum, pageSize, isActive: true });
                if (data?.success && Array.isArray(data?.offers)) {
                    setOffers((prevOffers) => {
                        const existingVariantIds = new Set(
                            prevOffers.flatMap((offer) =>
                                offer?.Variant?.map((variant) => variant?.id)
                            )
                        );
                        const newOffers = data.offers.map((offer) => ({
                            ...offer,
                            Variant: offer.Variant?.filter(
                                (variant) => !existingVariantIds.has(variant?.id)
                            ),
                        }));
                        return pageNum === 1 ? newOffers : [...prevOffers, ...newOffers];
                    });
                    setTotalPages(data?.pagination?.totalPages || 1);
                    setHasNextPage(data?.pagination?.hasNextPage || false);
                    setCurrentPage(data?.pagination?.currentPage || pageNum);
                } else {
                    setError(data?.error || "No offers found");
                }
            } catch (err) {
                setError("Failed to load offers. Please try again.");
            } finally {
                setLoading(false);
            }
        }, 300),
        []
    );

    // Fetch offers when currentPage changes
    useEffect(() => {
        fetchOffers(currentPage);
    }, [currentPage, fetchOffers]);

    // Handle Load More
    const handleLoadMore = useCallback(() => {
        if (!loading && hasNextPage) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }, [loading, hasNextPage]);

    // Memoized discounted price calculation
    const calculateDiscountedPrice = useCallback((price, discountValue) => {
        return (price - (price * discountValue) / 100).toFixed(2);
    }, []);

    // Memoized offers rendering
    const renderedOffers = useMemo(() => {
        return offers?.flatMap((offer) =>
            offer?.Variant?.map((variant) => (
                <div
                    key={variant?.id}
                    className="md:p-5 p-2 sm:border-2 sm:rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 relative"
                >
                    <div className="absolute z-10 top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                        {offer.description || "Special Offer"}
                    </div>
                    <Link href={`/details/${variant.productId}`}>
                        <div className="relative">
                            <Image
                                src={variant.images?.[0] || "/placeholder.png"}
                                alt={offer.description || "Offer Image"}
                                blurDataURL={variant.images?.[0] || "/placeholder.png"}
                                height={300}
                                width={300}
                                placeholder="blur"
                                className="w-auto h-28 object-contain"
                                loading="lazy"
                            />
                        </div>
                        <div className="mt-2 flex flex-wrap">
                            <span className="text-lg font-bold text-blue-300">
                                ${calculateDiscountedPrice(variant.price, offer.discountValue)}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 line-through">
                                ${(variant.price / 100).toFixed(2)}
                            </span>
                        </div>
                    </Link>
                </div>
            ))
        );
    }, [offers, calculateDiscountedPrice]);

    // Skeleton loader
    const renderSkeleton = () =>
        Array.from({ length: pageSize }).map((_, i) => (
            <div
                key={`skeleton-${i}`}
                className="md:p-5 p-2 sm:border-2 sm:rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 relative"
            >
                <div className="absolute z-10 top-2 left-2 bg-gray-200 dark:bg-slate-600 h-6 w-16 rounded animate-pulse"></div>
                <div className="relative">
                    <div className="w-auto h-28 bg-gray-200 dark:bg-slate-600 rounded animate-pulse"></div>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                    <div className="h-6 w-20 bg-gray-200 dark:bg-slate-600 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 dark:bg-slate-600 rounded animate-pulse"></div>
                </div>
            </div>
        ));

    if (error) {
        return (
            <div className="py-8 text-red-500 text-center">
                Error: {error}
                <button
                    onClick={() => fetchOffers(currentPage)}
                    className="ml-4 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!loading && !offers.length) {
        return <div className="py-8 text-center">No active offers available</div>;
    }

    return (
        <div>
            <div className="grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-0.5">
                {renderedOffers}
                {loading && renderSkeleton()}
            </div>

            {/* Load More Button */}
            {hasNextPage && !loading && (
                <div className="text-center mt-6">
                    <button
                        onClick={handleLoadMore}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default HotOffer;