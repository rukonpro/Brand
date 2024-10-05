import React, {Suspense} from 'react';
import {getProducts} from "@/app/utils/product/fetch_products_api";
import Link from "next/link";
import BackButton from "@/app/components/BackButtons/BackButton";
import RelatedProductCard from "@/app/components/RelatedProductCard/RelatedProductCard";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";
import {getCategoryById} from "@/app/utils/Category/fetch_category_api";
import Loader from "@/app/Loader";
import Navbar from "@/app/components/navbar/navbar";
import Image from "next/image";
import NotFoundImage from "@/public/images/not-found.png";


export async function generateMetadata({ params }) {
    const { id } = params;
    const category = await getCategoryById(id); // Fetch category details
    const products = await getProducts({ categoryId: id, limit: 1000, page: 1 }); // Fetch products under this category

    return {
        title: `${category?.data?.name} Products - Brand`,
        description: `Explore top products in the ${category?.data?.name} category at Brand. Browse through ${products?.data?.length} selected items with unbeatable prices and fast delivery.`,
        keywords: "source, product categories, Brand, online shopping, product sourcing",
        openGraph: {
            title: "Source - Brand",
            description: "Explore our diverse range of categories and products on Brand. Discover the perfect items that match your style and preferences.",
            url: "https://brand-rukon.vercel.app/source/[id]", // Use dynamic category ID if applicable
            type: "website",
        },
        twitter: {
            card: "summary",
            title: "Source - Brand",
            description: "Explore our diverse range of categories and products on Brand. Discover the perfect items that match your style and preferences.",
        },
    };
}


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
        <>
            <div className="sticky top-0 z-[20]">
                <Navbar/>
            </div>
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


                    <Suspense fallback={<Loader/>}>
                        {
                            !products?.data?.length ? (
                                    <div className="flex justify-center items-center">
                                        <div className="max-w-sm">
                                            <h1 className="text-red-500  text-lg pt-6">No products were found in this
                                                category, you can see in other categories.<Link href="/" className="text-blue-500 underline">Go to home</Link></h1>
                                            <Image src={NotFoundImage} placeholder="blur" alt="not found image"/>
                                        </div>

                                    </div>

                                ) :
                                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-0.5 md:gap-4 pt-10">
                                    {
                                        products?.data?.map((product, index) => {
                                            return (
                                                <li key={index}
                                                    className='bg-white dark:bg-slate-800 dark:border-slate-700 md:border-2 border-blue-200 md:rounded-lg p-3 flex-1 flex flex-col justify-between'>
                                                    <Link href={`/details/${product?.id}`}>

                                                        {/************************Related products Card ***********************/}

                                                        <RelatedProductCard product={product}/>

                                                    </Link>

                                                    <AddToCartButton product={product}/>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                        }

                    </Suspense>
                </div>
            </div>
        </>

    );
};

export default Source;