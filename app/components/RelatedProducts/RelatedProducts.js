'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { getProducts } from '@/app/utils/product/fetch_products_api';
import RecommendedItemsCard from '../RecommendedItems/RecommendedItemsCard';
import { SkeletonRecommendedItemCard } from '../Skeletons/SkeletonRecommendedItemCard';
import Loader from '@/app/Loader';

// In-memory cache to persist products across page navigations
const productCache = new Map(); // Map to handle different categoryId keys

const RelatedProducts = ({ categoryId }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const limit = 10;

    // Cache key based on categoryId
    const cacheKey = categoryId || 'all'; // Use 'all' if no categoryId

    // Initialize cache for this categoryId
    if (!productCache.has(cacheKey)) {
        productCache.set(cacheKey, {
            products: [],
            page: 1,
            hasMore: true,
        });
    }

    // Fetch products based on page number
    const fetchProducts = async (pageNum) => {
        // Check cache
        const cache = productCache.get(cacheKey);
        if (pageNum <= cache.page && cache.products.length > 0) {
            setProducts(cache.products);
            setPage(cache.page);
            setHasMore(cache.hasMore);
            return;
        }

        setIsLoading(true);
        try {
            const params = { limit, page: pageNum, categoryId };
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
                productCache.set(cacheKey, {
                    products: updatedProducts,
                    page: pageNum,
                    hasMore: pagination.hasNextPage || false,
                });

                return updatedProducts;
            });

            // Update hasMore
            setHasMore(pagination.hasNextPage || false);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch initial products or load from cache on mount
    useEffect(() => {
        const cache = productCache.get(cacheKey);
        if (cache.products.length > 0) {
            setProducts(cache.products);
            setPage(cache.page);
            setHasMore(cache.hasMore);
        } else {
            fetchProducts(1);
        }
    }, [cacheKey]); // Re-run when categoryId changes

    // Handle "Load More" button click
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage);
    };

    return (
        <div>
            <h1 className="text-xl font-bold text-gray-600 py-5 px-3 md:px-0 dark:text-slate-50">
                Related Products
            </h1>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0.5 md:gap-4">
                {products?.map((product) => (
                    <li key={product.id}>
                        <Suspense fallback={<SkeletonRecommendedItemCard />}>
                            <Link href={`/details/${product?.id}`}>
                                <RecommendedItemsCard product={product} />
                            </Link>
                        </Suspense>
                    </li>
                ))}
            </ul>
            {hasMore && !isLoading && (
                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className={`rounded-lg bg-blue-500 text-white text-lg py-2 px-10 inline-block ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Load more
                    </button>
                </div>
            )}
            {isLoading && (
                <div className="flex justify-center mt-4">
                    <Loader title="Loading..." />
                </div>
            )}
        </div>
    );
};

export default RelatedProducts;