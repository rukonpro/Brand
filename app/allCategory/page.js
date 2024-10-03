import React from 'react';
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";
import Image from "next/image";
import Link from "next/link";
import Photo from "@/public/images/copywriting.gif";
import {getProducts} from "@/app/utils/product/fetch_products_api";
import RecommendedItemsCard from "@/app/components/RecommendedItems/RecommendedItemsCard";
import BackButton from "@/app/components/BackButtons/BackButton";
import notfoundImage from "@/public/images/not-found.png"


export const metadata = {
    title: "All Categories - Brand",
    description: "Explore all product categories at Brand. Discover a wide range of items from fashion, electronics, home essentials, and more. Shop now and find exactly what you're looking for!",
    keywords: "all categories, product categories, online shopping, fashion, electronics, home essentials, Brand",
    openGraph: {
        title: "All Categories - Brand",
        description: "Explore all product categories at Brand. Discover a wide range of items from fashion, electronics, home essentials, and more. Shop now and find exactly what you're looking for!",
        url: "https://brand-rukon.vercel.app/categories", // Adjust the URL if necessary
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "All Categories - Brand",
        description: "Explore all product categories at Brand. Discover a wide range of items from fashion, electronics, home essentials, and more. Shop now and find exactly what you're looking for!",
    },
};



const AllCategory = async ({searchParams}) => {

 const {parentId,name} = searchParams;

const [categories,products]= await Promise.all([getAllCategory({parentId}),parentId&&getProducts({categoryId:parentId})]);


    return (
        <div className=" max-w-[1200px] mx-auto  py-5">
            <div className="flex justify-between items-center p-3 pb-6">
                <h1 className="text-3xl font-bold  ">

                    {name || "All categories"}
                </h1>
                <BackButton title="Back"/>
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-3 gap-0.5 sm:px-3 px-0">
                {categories?.data?.length > 0 ? categories?.data?.map((category) => (
                    <li
                        key={category.id}
                        className="bg-white dark:bg-slate-800 sm:rounded-lg sm:border-0  shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out"
                    >
                      <Link href={`/allCategory?parentId=${category?.id}&name=${category?.name}`}>
                          {
                              category?.photo?
                                  <Image
                                      className="w-full sm:h-48 h-32 object-cover"
                                      placeholder="blur"
                                      blurDataURL={category?.photo}
                                      src={category?.photo}
                                      width={300}
                                      height={300}
                                      alt={category?.name}
                                  />:

                                  <Image src={Photo} alt="search photo"  width={300} height={300}/>
                          }
                          <div className="p-4">
                              <h2 className="text-lg text-slate-700 dark:text-slate-200 font-semibold mb-2">{category?.name}</h2>
                              <p className="text-slate-600 dark:text-slate-300">{category?.description}</p>
                          </div>
                      </Link>
                    </li>
                )):null
                }
            </ul>

            {parentId && products?.data?.length>0? <ol
                className='grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-2 gap-1 pt-6 '>
                {
                    products?.data?.map((product) => (
                        <li key={product?.id}>
                         <Link href={`/details/${product?.id}`}>
                             <RecommendedItemsCard product={product}/>
                         </Link>
                        </li>
                    ))
                }

            </ol>:

           ( products?.data?.length===0 && categories?.data?.length===0 && <div className="flex justify-center items-center">
                <Image src={notfoundImage} width={300} height={300} alt="Seatch image"/>
            </div>)
            }
        </div>
    );
};

export default AllCategory;


