import React from 'react';
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";
import Image from "next/image";
import Link from "next/link";
import Photo from "@/public/images/copywriting.gif";
import {getProducts} from "@/app/utils/product/fetch_products_api";
import RecommendedItemsCard from "@/app/components/RecommendedItems/RecommendedItemsCard";
import BackButton from "@/app/components/BackButtons/BackButton";
import notfoundImage from "@/public/images/not-found.png"
const AllCategory = async ({searchParams}) => {

 const {parentId,name} = searchParams;

const [categories,products]= await Promise.all([getAllCategory({parentId}),parentId&&getProducts({categoryId:parentId})])


    return (
        <div className=" max-w-[1200px] mx-auto px-4 py-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-8 ">

                    {name || "All Categories"}
                </h1>
                <BackButton title="Back"/>
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {categories?.data?.length > 0 ? categories?.data?.map((category) => (
                    <li
                        key={category.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out"
                    >
                      <Link href={`/allCategory?parentId=${category?.id}&name=${category?.name}`}>
                          {
                              category?.photo?
                                  <Image
                                      className="w-full h-48 object-cover"
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
                              <h2 className="text-2xl text-slate-700 font-semibold mb-2">{category?.name}</h2>
                              <p className="text-slate-600">{category?.description}</p>
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