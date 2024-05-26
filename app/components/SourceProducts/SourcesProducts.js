"use client"
import React, { Suspense, useEffect, useState } from 'react';
import SourceCard from "@/app/components/SourceProducts/SourceCard";
import Link from "next/link";
import SourceProductCard from "@/app/components/SourceProducts/SourceProductCard";
import getProducts from '@/lib/product/getAllProducts';




const SourcesProducts = ({ category }) => {
    const [products, setProducts] = useState({})

    if (!category?._id) {
        return
    }

    const getAllProducts = async () => {
       

        const searchParams = {
            category: await category?._id
        }

        const products = await getProducts(searchParams);
        setProducts(products)
    }

    useEffect(() => {
        getAllProducts()
    }, [])
    

    return (

        <div className="sm:px-3">
            <div className='max-w-[1200px] mx-auto mt-5'>
                <div
                    className='grid grid-cols-12  border-2 border-gray-200 sm:rounded-lg gap-[2px] bg-gray-200 overflow-hidden'>
                    <div className="md:col-span-3 col-span-12 bg-white">
                        <SourceCard
                            id={category?._id}
                            photo={category?.photo}
                            name={category?.name} />
                    </div>
                    <div className='grid md:grid-cols-5 grid-cols-2 md:col-span-9 col-span-12 gap-[2px]'>
                        {
                            products?.products?.slice(0, 10).map((product, index) => {
                                return (
                                    <Suspense fallback="Loading..." key={index} className='bg-white'>
                                        <Link href={`/details/${product._id}`}>
                                            <SourceProductCard product={product} />
                                        </Link>
                                    </Suspense>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SourcesProducts;