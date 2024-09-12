import React, {Suspense} from 'react';
import {getProducts} from "@/app/utils/product/fetch_products_api";
import Link from "next/link";
import BackButton from "@/app/components/BackButtons/BackButton";
import RelatedProductCard from "@/app/components/RelatedProductCard/RelatedProductCard";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";
import {getCategoryById} from "@/app/utils/Category/fetch_category_api";
import Image from "next/image";
import Loading from "@/app/loading";

const Source = async ({params}) => {


    const categoryById=await getCategoryById(params?.id);

    const products = await getProducts(
        {
            categoryId: params?.id,
            limit: 10,
            page: 1
        }
    );

    // console.log(products)
    return (
        <div className='py-5 sm:px-3'>
            <div className='max-w-[1200px] mx-auto'>


                <div className="flex justify-between items-center w-full md:px-0 px-3">
                    <h1 className="text-2xl  font-bold   text-blue-500/80 ">
                        <span className="rounded  backdrop-blur">{categoryById?.data?.name}</span>
                    </h1>
                    <div>
                        <BackButton title="Back"/>
                    </div>
                </div>


                <Suspense fallback={<Loading/>}>
                    {
                        !products?.data?.length ? (
                                <h1 className="text-red-500 text-center text-2xl font-bold">Product not found</h1>
                            ) :
                            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-0.5 md:gap-4 pt-10">
                                {
                                    products?.data?.map((product, index) => {
                                        return (
                                            <li key={index}
                                                className='bg-white md:border-2 border-blue-200 md:rounded-lg p-3 flex-1 flex flex-col justify-between'>
                                                <Link href={`/details/${product?.id}`}>

                                                    {/************************Related products Card ***********************/}

                                                    <RelatedProductCard product={product}/>

                                                </Link>

                                                <AddToCartButton id={product?.id}/>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                    }

                </Suspense>
            </div>
        </div>
    );
};

export default Source;