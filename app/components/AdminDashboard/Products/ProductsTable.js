'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NotFoundImage from '@/public/images/not-found.png';
import UpdateProductOpenModalButton from '@/app/components/AdminDashboard/Products/UpdateProductOpenModalButton';
import useSWR from 'swr';
import { fetcher } from '@/app/utils/fetcher/fetcher';
import Loader from '@/app/Loader';
import AddProductButton from './AddProductButton';

// In-memory cache to persist products across page navigations
const productCache = new Map();
const cacheKey = 'products'; // Single key for admin products

const ProductsTable = ({ brands, categories }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const limit = 5;

    // Initialize cache
    if (!productCache.has(cacheKey)) {
        productCache.set(cacheKey, {
            products: [],
            page: 1,
            hasMore: true,
        });
    }

    // SWR fetcher for paginated products
    const { data, error, isLoading, mutate } = useSWR(
        `/api/product/findMany?page=${page}&limit=${limit}`,
        fetcher,
        {
            revalidateOnMount: page === 1 && productCache.get(cacheKey).products.length === 0,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000, // Cache requests for 60 seconds
            keepPreviousData: true, // Preserve previous data during fetch
        }
    );

    // Process fetched data and update state/cache
    useEffect(() => {
        if (data?.data) {
            const newProducts = data.data || [];
            const pagination = data.pagination || {};

            setProducts((prevProducts) => {
                const existingIds = new Set(prevProducts.map((product) => product.id));
                const uniqueNewProducts = newProducts.filter(
                    (product) => !existingIds.has(product.id)
                );
                const updatedProducts = [...prevProducts, ...uniqueNewProducts];

                // Update cache
                productCache.set(cacheKey, {
                    products: updatedProducts,
                    page,
                    hasMore: pagination.hasNextPage || false,
                });

                return updatedProducts;
            });

            setHasMore(pagination.hasNextPage || false);
        }
    }, [data, page]);

    // Load cached products on mount
    useEffect(() => {
        const cache = productCache.get(cacheKey);
        if (cache.products.length > 0) {
            setProducts(cache.products);
            setPage(cache.page);
            setHasMore(cache.hasMore);
        }
    }, []);

    // Handle "Load More" button click
    const handleLoadMore = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        setIsLoadingMore(true);
        try {
            await mutate(`/api/product/findMany?page=${nextPage}&limit=${limit}`, {
                revalidate: true,
            });
        } finally {
            setIsLoadingMore(false);
        }
    };

    // Handle loading and error states
    if (isLoading && products.length === 0) {
        return <Loader title="Products Loading..." />;
    }

    return (
        <div className="p-3">
            <div className="flex justify-between items-center pb-1">
                <h1 className="text-lg">Products</h1>
                <AddProductButton mutate={mutate} categories={categories} brands={brands} />
            </div>
            <div className="overflow-auto">
                {products?.length > 0 ? (
                    <>
                        <table className="table-auto divide-y divide-gray-200 overflow-x-auto">
                            <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">ID</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Photos</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Name</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Description</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Price</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Warranty</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Protection</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Sizes</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Rating</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Tags</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Availability</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">DiscountPercentage</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">TaxPercentage</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">DeliveryFee</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Brand</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Category</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Dimension</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Offers</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Action</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product, i) => (
                                <tr key={product.id}>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{i + 1}</td>
                                    <td className="px-4 py-2 text-center">
                                        <Image
                                            src={product?.images?.[0] || NotFoundImage}
                                            alt={product?.name}
                                            height={80}
                                            width={80}
                                            className="h-20 w-20 object-contain"
                                        />
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-left">
                                        {product?.name?.slice(0, 20) || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-left">
                                        {product?.description?.slice(0, 50) || 'N/A'}...
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        ${product?.basePrice?.toFixed(2) || '0.00'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.warranty || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.protection || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.sizes?.join(', ') || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.rating || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.tags?.map((tag) => (
                                            <span key={tag}>#{tag} </span>
                                        )) || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.status || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.discountPercentage || '0%'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.taxPercentage || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.deliveryFee || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.brand?.name || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.category?.name || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.dimension
                                            ? `${product?.dimension?.height || ''}x${product?.dimension?.width || ''}x${product?.dimension?.length || ''}`
                                            : 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">
                                        {product?.category?.offers?.[0]?.isActive ? 'Active' : 'Inactive' || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 space-x-2 text-center">
                                        <Suspense fallback={null}>
                                            <UpdateProductOpenModalButton
                                                productId={product?.id}
                                                product={product}
                                                brands={brands}
                                                mutate={mutate}
                                                categories={categories}
                                            />
                                        </Suspense>
                                        <button className="text-red-600 hover:text-red-900">
                                            <span role="img" aria-label="delete">🗑️</span>
                                        </button>
                                        <Link href={`/details/${product?.id}`}>
                                            <button className="text-blue-600 hover:text-blue-900">Details</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {hasMore && !isLoadingMore && (
                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className={`rounded-lg bg-blue-500 text-white text-lg py-2 px-10 inline-block ${
                                        isLoadingMore ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    Load more
                                </button>
                            </div>
                        )}
                        {isLoadingMore && (
                            <div className="flex justify-center mt-4">
                                <Loader title="Loading more..." />
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <p>
                            You have no products, please <AddProductButton mutate={mutate} categories={categories} brands={brands} />
                        </p>
                        {error && <div className="text-red-500">{error?.message}</div>}
                        <div className="flex justify-center">
                            <Image src={NotFoundImage} alt="Not found" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsTable;