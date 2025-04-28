'use client';

import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { useSWRConfig } from 'swr';
import { getProducts } from '@/app/utils/product/fetch_products_api';
import { IoCloseSharp } from 'react-icons/io5';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Loader from '@/app/Loader';
import Image from 'next/image';
import NotFoundImage from '@/public/images/not-found.png';
import useSWR from 'swr';

// In-memory cache to persist search results
const searchCache = new Map();

// eslint-disable-next-line react/display-name
const ProductItem = memo(({ product, toggleDrawer }) => (
    <li
        key={product.id}
        className="border-b border-gray-200 dark:border-slate-700 p-2 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 rounded-lg overflow-hidden transition-colors duration-200"
    >
        <Link href={`/details/${product.id}`} onClick={toggleDrawer} className="flex items-center gap-3">
            <Image
                src={product?.images?.[0] || NotFoundImage}
                height={100}
                width={100}
                placeholder="blur"
                blurDataURL={product?.images?.[0] || NotFoundImage}
                alt={product?.name}
                className="h-36 w-36 object-contain"
            />
            <div>
                <h1 className="text-sm font-semibold">{product?.name || 'N/A'}</h1>
                <p className="text-gray-600">Price ${product?.basePrice?.toFixed(2) || '0.00'}</p>
            </div>
        </Link>
    </li>
));

const SearchDrawer = ({ isOpen, toggleDrawer, handleSearchChange }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [localSearch, setLocalSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const inputRef = useRef(null);

    const limit = 10; // Increased for better UX
    const minQueryLength = 2;
    const cacheKey = localSearch && localSearch.length >= minQueryLength ? `search:${localSearch}:${page}` : null;

    // SWR fetcher
    const { data, error, isLoading } = useSWR(
        cacheKey ? `/api/product/search?name=${encodeURIComponent(localSearch)}&page=${page}&limit=${limit}` : null,
        async (url) => {
            const params = { name: localSearch, page, limit };
            const res = await getProducts(params);
            console.log('SWR Fetch:', { url, data: res.data });
            return res.data;
        },
        {
            revalidateOnMount: !searchCache.has(cacheKey),
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 10000, // Cache requests for 10 seconds
            keepPreviousData: true,
            revalidateIfStale: true,
        }
    );

    // Auto-focus input when drawer opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Process fetched data and update state/cache
    useEffect(() => {
        if (error) {
            setErrorMessage('Failed to fetch products. Please try again.');
            setProducts([]);
            setHasMore(false);
            console.log('SWR Error:', error);
            return;
        }
        setErrorMessage(null);

        if (data?.data) {
            const newProducts = data.data || [];
            const pagination = data.pagination || {};

            setProducts((prevProducts) => {
                const existingIds = new Set(prevProducts.map((product) => product.id));
                const uniqueNewProducts = newProducts.filter((product) => !existingIds.has(product.id));
                const updatedProducts = [...prevProducts, ...uniqueNewProducts];

                // Update cache
                if (cacheKey) {
                    // Prune cache if too large
                    if (searchCache.size > 100) {
                        searchCache.clear();
                    }
                    searchCache.set(cacheKey, {
                        products: updatedProducts,
                        page,
                        hasMore: pagination.hasNextPage || false,
                    });
                }
                return updatedProducts;
            });

            setHasMore(pagination.hasNextPage || false);
        } else if (!localSearch || localSearch.length < minQueryLength) {
            setProducts([]);
            setPage(1);
            setHasMore(true);
        }
    }, [data, error, cacheKey, localSearch, page]);

    // Load cached products when search changes
    useEffect(() => {
        if (cacheKey && searchCache.has(cacheKey)) {
            const cache = searchCache.get(cacheKey);
            setProducts(cache.products);
            setPage(cache.page);
            setHasMore(cache.hasMore);
            console.log('Loaded from Cache:', { cacheKey, cache });
        } else if (!localSearch || localSearch.length < minQueryLength) {
            setProducts([]);
            setPage(1);
            setHasMore(true);
        }
    }, [localSearch, cacheKey]);

    // Handle "Load More" button click
    const { mutate } = useSWRConfig();
    const handleLoadMore = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        setIsLoadingMore(true);
        try {
            await mutate(
                `/api/product/search?name=${encodeURIComponent(localSearch)}&page=${nextPage}&limit=${limit}`,
                async () => {
                    const params = { name: localSearch, page: nextPage, limit };
                    const res = await getProducts(params);
                    console.log('Load More Fetch:', { params, data: res.data });
                    return res.data;
                },
                { revalidate: true }
            );
        } catch (err) {
            setErrorMessage('Failed to load more products.');
            console.log('Load More Error:', err);
        } finally {
            setIsLoadingMore(false);
        }
    };

    // Optimized debounce function
    const debounce = useCallback((func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    }, []);

    // Debounced search change handler
    const debouncedHandleSearchChange = useCallback(
        debounce((value) => {
            setLocalSearch(value);
            setPage(1);
            handleSearchChange({ target: { value } });
        }, 0), // 150ms for fast response
        [handleSearchChange, debounce]
    );

    // Immediate onChange handler
    const onSearchChange = (e) => {
        const value = e.target.value;
        debouncedHandleSearchChange(value);
    };

    // Clear search
    const clearSearch = () => {
        setLocalSearch('');
        setProducts([]);
        setPage(1);
        setHasMore(true);
        setErrorMessage(null);
        handleSearchChange({ target: { value: '' } });
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div>
            <div
                className={`fixed flex justify-center items-center h-full w-full inset-0 z-50 overflow-hidden duration-700 ${
                    isOpen ? 'block' : 'hidden'
                }`}
            >
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={toggleDrawer}>
                    <div className="absolute inset-0 backdrop-blur-sm"></div>
                </div>
                <div
                    className={`max-w-[700px] max-h-[600px] h-full border-2 border-slate-50 dark:border-slate-700 w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-3xl shadow-xl transform transition ease-in-out duration-700 rounded-lg relative flex flex-col`}
                >
                    {/* Sticky Header with Close Button and Input */}
                    <div className="sticky top-0 z-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md pt-5 px-5 pb-3">
                        <div className="flex items-center justify-end">
                            <button onClick={toggleDrawer} aria-label="Close search">
                                <IoCloseSharp size={25} className="text-red-500" />
                            </button>
                        </div>
                        <div className="py-2 flex justify-center">
                            <div className="relative w-full max-w-xs">
                                <input
                                    type="text"
                                    className="bg-slate-200 dark:bg-slate-700 w-full px-4 py-2 rounded-full focus:outline-none pr-10"
                                    onChange={onSearchChange}
                                    value={localSearch}
                                    placeholder="Search products..."
                                    ref={inputRef}
                                    aria-label="Search products"
                                />
                                {isLoading && (
                                    <span className="absolute top-3 right-8 animate-spin text-gray-400">⏳</span>
                                )}
                                {localSearch && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                                        aria-label="Clear search"
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                                {!isLoading && !localSearch && (
                                    <FaSearch className="absolute top-3 right-3 text-gray-400" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-5 pb-10">
                        {errorMessage && (
                            <div className="text-center text-red-500 py-2">{errorMessage}</div>
                        )}
                        <ul className="border-t-2 border-slate-200 dark:border-slate-700 grid grid-cols-1 gap-3 py-2">
                            {isLoading && products.length === 0 ? (
                                <Loader title="Searching..." />
                            ) : products?.length > 0 ? (
                                <div className="animate-fade-in">
                                    {products.map((product) => (
                                        <ProductItem key={product.id} product={product} toggleDrawer={toggleDrawer} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center animate-fade-in">
                                    {localSearch && localSearch.length >= minQueryLength ? (
                                        <p className="text-red-500">No products found!</p>
                                    ) : (
                                        <p>Please enter at least {minQueryLength} characters to search.</p>
                                    )}
                                    <div className="flex justify-center items-center">
                                        <Image src={NotFoundImage} height={300} width={300} alt="Not found" />
                                    </div>
                                </div>
                            )}
                        </ul>

                        {hasMore && !isLoadingMore && products.length > 0 && (
                            <div className="flex justify-center mt-4">
                                <button
                                    type="button"
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className={`rounded-lg bg-blue-500 text-white text-lg py-2 px-10 inline-block transition-opacity duration-200 ${
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchDrawer;