'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProducts } from '@/app/utils/product/fetch_products_api';
import BackButton from '@/app/components/BackButtons/BackButton';
import RelatedProductCard from '@/app/components/RelatedProductCard/RelatedProductCard';
import AddToCartButton from '@/app/components/AddToCartButton/AddToCartButton';
import Loader from '@/app/Loader';
import Navbar from '@/app/components/navbar/navbar';
import Image from 'next/image';
import NotFoundImage from '@/public/images/not-found.png';

// In-memory cache to persist products across page navigations
const productCache = new Map(); // Map to handle different categoryId keys

const Source = ({ initialProducts, pagination, category, categoryId }) => {
    const params = useParams();
    const id = categoryId || params.id; // Use passed categoryId or from params

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(pagination?.hasNextPage || false);

    const limit = 10;

    // Cache key based on categoryId
    const cacheKey = id || 'all';

    // Initialize cache for this categoryId
    if (!productCache.has(cacheKey)) {
        productCache.set(cacheKey, {
            products: initialProducts || [],
            page: 1,
            hasMore: pagination?.hasNextPage || false,
        });
    }

    // Fetch products based on page number
    const fetchProducts = async (pageNum) => {
        const cache = productCache.get(cacheKey);
        if (pageNum <= cache.page && cache.products.length > 0) {
            setProducts(cache.products);
            setPage(cache.page);
            setHasMore(cache.hasMore);
            return;
        }

        setIsLoading(true);
        try {
            const params = { limit, page: pageNum, categoryId: id };
            const response = await getProducts(params);
            const newProducts = response?.data?.data || [];
            const newPagination = response?.data?.pagination || {};

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
                    hasMore: newPagination.hasNextPage || false,
                });

                return updatedProducts;
            });

            // Update hasMore
            setHasMore(newPagination.hasNextPage || false);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Initialize state from cache or initialProducts on mount
    useEffect(() => {
        const cache = productCache.get(cacheKey);
        if (cache.products.length > 0) {
            setProducts(cache.products);
            setPage(cache.page);
            setHasMore(cache.hasMore);
        } else {
            setProducts(initialProducts || []);
            setPage(1);
            setHasMore(pagination?.hasNextPage || false);
            if (!initialProducts || initialProducts.length === 0) {
                fetchProducts(1);
            }
        }
    }, [initialProducts, pagination, cacheKey]);

    // Handle "Load More" button click
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage);
    };

    return (
        <>
            <div className="sticky top-0 z-[20]">
                <Navbar />
            </div>
            <div className="py-5 sm:px-3">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex justify-between items-center w-full md:px-0 px-3">
                        <h1 className="text-2xl font-bold text-blue-500/80">
                            <span className="rounded backdrop-blur">{category?.name || 'Category'}</span>
                        </h1>
                        <div>
                            <BackButton title="Back" />
                        </div>
                    </div>

                    <Suspense fallback={<Loader />}>
                        {!products?.length ? (
                            <div className="flex justify-center items-center">
                                <div className="max-w-sm">
                                    <h1 className="text-red-500 text-lg pt-6">
                                        No products were found in this category, you can see in other categories.
                                        <Link href="/" className="text-blue-500 underline">
                                            Go to home
                                        </Link>
                                    </h1>
                                    <Image src={NotFoundImage} placeholder="blur" alt="not found image" />
                                </div>
                            </div>
                        ) : (
                            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-0.5 md:gap-4 pt-10">
                                {products?.map((product) => (
                                    <li
                                        key={product.id}
                                        className="bg-white dark:bg-slate-800 dark:border-slate-700 md:border-2 border-blue-200 md:rounded-lg p-3 flex-1 flex flex-col justify-between"
                                    >
                                        <Link href={`/details/${product?.id}`}>
                                            <RelatedProductCard product={product} />
                                        </Link>
                                        <AddToCartButton product={product} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Suspense>

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
            </div>
        </>
    );
};

export default Source;