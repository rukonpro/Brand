// components/SearchDrawer.js

import React, {useEffect, useState,useCallback} from 'react';
import {getProducts} from "@/app/utils/product/fetch_products_api";
import Link from "next/link";
import Loading from "@/app/loading";
import Image from "next/image";

const SearchDrawer = ({isOpen,toggleDrawer}) => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Debounce search function to limit API calls
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.trim();
        setSearch(searchValue);
    };

    const fetchProducts = useCallback(async () => {
        if (!search) {
            setProducts([]);
            return;
        }

        setIsLoading(true);  // Start loading
        try {
            const res = await getProducts({ name: search });
            setProducts(res.data);
        } catch (error) {
            setProducts([]);
        } finally {
            setIsLoading(false);  // End loading
        }
    }, [search]);

    // Debounce the API call by 500ms to avoid frequent calls while typing
    const debouncedFetchProducts = useCallback(debounce(fetchProducts, 500), [fetchProducts]);

    useEffect(() => {
        debouncedFetchProducts();
    }, [search, debouncedFetchProducts]);

    return (
        <div>
             <div className={`fixed  top-0 left-0 right-0 inset-0 z-50 overflow-hidden  duration-700  ${isOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={toggleDrawer}>
                    <div className="absolute inset-0 bg-slate-700/50 "></div>
                </div>
                <div
                    className={`fixed top-0 left-0 right-0 mx-auto flex  w-full backdrop-blur-xl bg-blue-100/50  shadow-xl transform transition ease-in-out duration-300 overflow-y-auto`}>
                    <div className="w-full ">
                        <div className="max-w-[1200px] mx-auto py-10 px-5">
                            <div className="flex items-center justify-between ">
                                            <h2 className="text-lg font-semibold">Search Products</h2>
                                            <button onClick={toggleDrawer} className="text-gray-600">
                                                X
                                            </button>
                                        </div>
                            <div className="flex md:w-4/6 w-full mx-auto  pb-10 pt-5">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    onChange={handleSearchChange}
                                    className="h-[40px] w-full px-3 border-2 bg-slate-50 border-blue-500 rounded-l-lg "/>
                                <button type="button"
                                        className="h-[40px] w-[100px] px-3 col-span-3 border-2 border-blue-500 rounded-r-lg bg-blue-500 text-white">Search
                                </button>
                            </div>

                            <ul className=" border-t border-gray-50-50">

                                {
                                    isLoading ? <Loading/> : products?.length ? products?.map(product => {
                                        return (
                                            <li  key={product?.id} className="border-b border-gray-200 py-2">
                                                <Link
                                                    href={`/details/${product.id}`}

                                                    onClick={toggleDrawer}
                                                    className="flex items-center gap-3"
                                                >
                                                 <Image
                                                     src={product?.photos?.[0]}
                                                     height={100}
                                                     width={100}
                                                     placeholder="blur"
                                                     blurDataURL={product?.photos?.[0]}
                                                     alt={product?.name}/>
                                                    <div>
                                                        <h1>{product?.name}</h1>
                                                        <p>Price ${product?.price}</p>
                                                    </div>

                                                </Link>
                                            </li>
                                        )
                                    }) : <p>No products found</p>
                                }

                            </ul>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default SearchDrawer;
