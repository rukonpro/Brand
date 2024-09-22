"use client"
import React, { useState } from 'react';
import CatalogNav from './CatalogNav';
import Image from "next/image";
import Link from "next/link";


const Catalogs = ({ products }) => {

    const [gitView, setGitView] = useState(false);
    return (
        <div className="col-span-12 md:col-span-8 relative">

            <CatalogNav setGitView={setGitView} itemsCount={products?.length} />


            <div className="mt-4">
                <ol className={`grid ${gitView ? " grid-cols-2 sm:grid-cols-3 md:grid-cols-2" +
                    " lg:grid-cols-3" : "grid-cols-1"} gap-0.5 lg:gap-4`}>
                    {
                        products?.map((product) => {

                            return (
                                <li key={product?.id}>
                                    <div className=" grid grid-cols-12 gap-4 bg-white p-3 lg:rounded-lg">
                                        <div
                                            className={`${gitView ? "col-span-12" : 'col-span-4'} flex justify-center items-center h-full w-full `}>
                                            <Image
                                                src={product?.photos?.[0]}
                                                width={100}
                                                height={100}
                                                loading='lazy'
                                                placeholder="blur"
                                                blurDataURL={product?.photos?.[0]}
                                                alt={product?.name}
                                                className='w-40 h-40'
                                            />
                                        </div>
                                        <div className={`${gitView ? "col-span-12" : "col-span-8"}`}>
                                            <h1 className="md:text-xl font-bold text-gray-500">{product?.name}</h1>
                                            <p className="md:text-2xl font-bold text-gray-600 pt-2">${product?.price}</p>

                                            <p className="text-sm md:text-md text-gray-500">{product?.description?.slice(0, 150)}</p>


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
    );
};

export default Catalogs;