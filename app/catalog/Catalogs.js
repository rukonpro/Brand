'use client';

import React, { useState, useEffect } from 'react';
import CatalogNav from './CatalogNav';
import Image from 'next/image';
import Link from 'next/link';
import CatalogAsideManu from './CatalogAsideMenu';
import Drawer from '../components/Drawer/Drawer';
import { getProducts } from '@/app/utils/product/fetch_products_api';
import Loader from '@/app/Loader';

// In-memory cache to persist products across page navigations
const productCache = new Map(); // Map to handle different categoryName keys

const Catalogs = ({ initialProducts, pagination, brands, categories, categoryName }) => {
    const [isDrawerOpen, setDropdownOpen] = useState(false);
    const [gitView, setGitView] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(pagination?.hasNextPage || false);

    const limit = 10; // Matches pageSize from server

    // Initialize cache for this categoryName
    const cacheKey = categoryName || 'all'; // Use 'all' if no categoryName
    if (!productCache.has(cacheKey)) {
        productCache.set(cacheKey, {
            products: initialProducts,
            page: 1,
            hasMore: pagination?.hasNextPage || false,
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
            const params = { page: pageNum, pageSize: limit, categoryName };
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
            setProducts(initialProducts);
            setPage(1);
            setHasMore(pagination?.hasNextPage || false);
        }
    }, [initialProducts, pagination, cacheKey]);

    // Handle "Load More" button click
    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage);
    };

    const handleToggleDrawer = () => {
        setDropdownOpen(!isDrawerOpen);
    };

    const handleClose = () => {
        setDropdownOpen(false);
    };

    return (
        <>
            <Drawer handleClose={handleClose} handleToggleDrawer={handleToggleDrawer} isDrawerOpen={isDrawerOpen}>
                <CatalogAsideManu categories={categories} brands={brands} />
            </Drawer>
            <div className="grid grid-cols-12 gap-4">
                <aside className="col-span-4 bg-white p-3 rounded-lg hidden md:block">
                    <CatalogAsideManu categories={categories} brands={brands} />
                </aside>

                <div className="col-span-12 md:col-span-8 relative">
                    <CatalogNav
                        setGitView={setGitView}
                        itemsCount={products?.length}
                        handleToggleDrawer={handleToggleDrawer}
                    />

                    <div className="mt-4">
                        <ol
                            className={`grid ${
                                gitView ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'
                            } gap-0.5 lg:gap-4`}
                        >
                            {products?.map((product) => (
                                <li key={product.id}>
                                    <div className="grid grid-cols-12 bg-white lg:rounded-lg">
                                        <div
                                            className={`${gitView ? 'col-span-12' : 'col-span-4'} flex justify-center items-center p-2`}
                                        >
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Image
                                                    src={product?.images?.[0]}
                                                    width={290}
                                                    height={300}
                                                    loading="lazy"
                                                    placeholder="blur"
                                                    blurDataURL={product?.images?.[0]}
                                                    alt={product?.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>
                                        <div className={`${gitView ? 'col-span-12' : 'col-span-8'} p-2`}>
                                            <div>
                                                <h1 className="md:text-sm font-bold text-gray-500 truncate">{product?.name}</h1>
                                                <p className="md:text-2xl font-bold text-gray-600 pt-2">${product?.basePrice}</p>
                                                <Link href={`/details/${product?.id}`}>
                                                    <button type="button" className="text-blue-500 mt-2">
                                                        View details
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>

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

export default Catalogs;