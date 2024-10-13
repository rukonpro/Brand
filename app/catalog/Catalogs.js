"use client"
import React, { useState } from 'react';
import CatalogNav from './CatalogNav';
import Image from "next/image";
import Link from "next/link";
import CatalogAsideManu from './CatalogAsideMenu';
import Drawer from '../components/Drawer/Drawer';


const Catalogs = ({ products, brands, categories }) => {
    const [isDrawerOpen, setDropdownOpen] = useState(false);
    const [gitView, setGitView] = useState(false);


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


                <aside className=" col-span-4 bg-white p-3 rounded-lg hidden md:block">
                    <CatalogAsideManu categories={categories} brands={brands} />
                </aside>

                <div className="col-span-12 md:col-span-8 relative">

                    <CatalogNav setGitView={setGitView} itemsCount={products?.length} handleToggleDrawer={handleToggleDrawer} />


                    <div className="mt-4">
                        <ol className={`grid ${gitView ? " grid-cols-2 sm:grid-cols-3 md:grid-cols-2" +
                            " lg:grid-cols-4" : "grid-cols-1"} gap-0.5 lg:gap-4`}>
                            {
                                products?.map((product) => {

                                    return (
                                        <li key={product?.id}>
                                            <div className=" grid grid-cols-12 gap-4 bg-white p-3 lg:rounded-lg">
                                                <div
                                                    className={`${gitView ? "col-span-12" : 'col-span-4'} flex justify-center items-center  `}>
                                                    <Image
                                                        src={product?.photos?.[0]}
                                                        width={112}
                                                        height={112}
                                                        loading='lazy'
                                                        placeholder="blur"
                                                        blurDataURL={product?.photos?.[0]}
                                                        alt={product?.name}
                                                        className='w-28 h-28 object-contain'
                                                    />
                                                </div>
                                                <div className={`${gitView ? "col-span-12" : "col-span-8"}`}>
                                                    <h1 className="md:text-xl font-bold text-gray-500 truncate">{product?.name}</h1>
                                                    <p className="md:text-2xl font-bold text-gray-600 pt-2">${product?.price}</p>

                                                    <Link href={`/details/${product?.id}`}>
                                                        <button type="button" className="text-blue-500 mt-2">
                                                            View details
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Catalogs;