// components/SearchDrawer.js

import React, {useEffect, useState,useCallback} from 'react';
import {getProducts} from "@/app/utils/product/fetch_products_api";
import { IoCloseSharp } from "react-icons/io5";
import Link from "next/link";
import Loading from "@/app/loading";
import Image from "next/image";
import {FaSearch} from "react-icons/fa";

const SearchDrawer = ({isOpen,toggleDrawer,handleSearchChange,search}) => {

    const [products, setProducts] = useState([]);

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
             <div className={`fixed flex justify-center items-center h-full  w-full inset-0 z-50 overflow-hidden  duration-700  ${isOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={toggleDrawer}>
                    <div className="absolute inset-0 backdrop-blur-sm "></div>
                </div>
                <div
                    className={` max-w-[700px] max-h-[600px] h-full border-2 border-slate-50 dark:border-slate-700  w-full  bg-white/50 dark:bg-gray-800/50 backdrop-blur-3xl shadow-xl overflow-auto transform transition ease-in-out duration-700 rounded-lg relative`}>

                    <div className=" pb-10 pt-5 px-5">
                        <div className="flex items-center justify-between ">
                            <h2 className="text-lg font-semibold">Search your products</h2>
                            <button onClick={toggleDrawer}>
                                <IoCloseSharp size={25} className="text-red-500"/>
                            </button>
                        </div>
                        <div className=" py-5 flex justify-center">
                            <div className="relative w-full max-w-xs">
                                <input
                                    type="text"
                                    className="bg-slate-200 dark:bg-slate-700 w-full px-4 py-2 rounded-full focus:outline-none"
                                    onChange={handleSearchChange}
                                    value={search}
                                    placeholder="Search..."
                                />
                                <FaSearch className="absolute top-3 right-3 text-gray-400"/>
                            </div>
                        </div>

                        <ul className=" border-t-2 border-slate-200 dark:border-slate-700 grid grid-cols-1 gap-3 py-2">

                            {
                                isLoading ? <Loading/> : products?.length ? products?.map(product => {
                                    return (
                                        <li key={product?.id} className="border-b border-gray-200 dark:border-slate-700 p-2 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 rounded-lg overflow-hidden">
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
                                                    alt={product?.name}
                                                className="h-36 w-36"
                                                />
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
    );
};

export default SearchDrawer;
