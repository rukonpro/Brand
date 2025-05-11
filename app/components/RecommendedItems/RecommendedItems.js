'use client';

import React, { Suspense, useState, useEffect } from 'react';
import RecommendedItemsCard from './RecommendedItemsCard';
import Link from 'next/link';
import { getProducts } from '@/app/utils/product/fetch_products_api';
import { SkeletonRecommendedItemCard } from '@/app/components/Skeletons/SkeletonRecommendedItemCard';


// In-memory cache to persist products across page navigations
const productCache = {
    products: [],
    page: 1,
    hasMore: true,
};

const RecommendedItems = () => {
    const [products, setProducts] = useState(productCache.products);
    const [page, setPage] = useState(productCache.page);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(productCache.hasMore);

    const limit = 12;

    // Fetch products based on page number
    const fetchProducts = async (pageNum) => {
        // Check if products for this page are already in cache
        if (pageNum <= productCache.page && productCache.products.length > 0) {
            setProducts(productCache.products);
            setPage(productCache.page);
            setHasMore(productCache.hasMore);
            return;
        }

        setIsLoading(true);
        try {
            const params = { limit, page: pageNum };
            const response = await getProducts(params);
            const newProducts = response?.data?.data || [];
            const pagination = response?.data?.pagination || {};

            // Append only unique new products based on product.id
            setProducts((prevProducts) => {
                const existingIds = new Set(prevProducts.map((product) => product.id));
                const uniqueNewProducts = newProducts.filter(
                    (product) => !existingIds.has(product.id)
                );
                const updatedProducts = [...prevProducts, ...uniqueNewProducts];

                // Update cache
                productCache.products = updatedProducts;
                productCache.page = pageNum;
                productCache.hasMore = pagination.hasNextPage || false;

                return updatedProducts;
            });

            // Update hasMore based on pagination data
            setHasMore(pagination.hasNextPage || false);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch initial products or load from cache on component mount
    useEffect(() => {
        if (productCache.products.length > 0) {
            // Load from cache if available
            setProducts(productCache.products);
            setPage(productCache.page);
            setHasMore(productCache.hasMore);
        } else {
            // Fetch first page if cache is empty
            fetchProducts(1);
        }
    }, []); // Empty dependency array to run only on mount

    // Handle "Load More" button click
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage);
    };

    return (
        <div className="pt-5 sm:px-3">
            <div className="max-w-[1200px] mx-auto md:border-2 pb-10 md:px-5 rounded-lg dark:border-slate-700 backdrop-blur-3xl">
                <h1 className="text-2xl py-5 sm:px-0 px-4">Just For You</h1>
                <ul className="grid lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-0.5">
                    {products?.map((product, index) => (
                        <li key={`${product?.id}-${index}`}>
                            <Link href={`/details/${product?.id}`}>
                                <Suspense fallback={<SkeletonRecommendedItemCard />}>
                                    <RecommendedItemsCard product={product} />
                                </Suspense>
                            </Link>
                        </li>
                    ))}

                    {isLoading && (
                        [...Array(limit)].map((_, index) => (
                        <li key={index}> <SkeletonRecommendedItemCard /></li>
                ))
                    )}
                </ul>


                {hasMore && !isLoading && (
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleLoadMore}
                            disabled={isLoading}
                            className={`rounded-lg bg-blue-500 text-white text-lg py-2 px-10 mt-2 inline-block ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            Load more
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default RecommendedItems;