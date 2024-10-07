"use client"
import React, {useState} from 'react';
import BackButton from "@/app/components/BackButtons/BackButton";
import CategoriesCard from "@/app/components/AdminDashboard/Categories/CategoriesCard";
import NotFoundPhoto from "@/public/images/not-found.png"
import Image from "next/image";
import CategoryManuAdmin from "@/app/components/AdminDashboard/creatore/CategoryMenuAdmin";
import Loader from '@/app/Loader';

const CategoriesItems = () => {
    
    const {
        data: categories,
        error: errorCategories,
        isLoading: isLoadingCategories,
        mutate
    } = useSWR('/api/category/findMany', fetcher);

    const [category,setCategory]=useState({});



    return isLoadingCategories?(<Loader title="Category Loading..."/>):(
        <div >
            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] min-h-screen transition-all duration-700 relative">
                <div className="hidden lg:block">

                        <CategoryManuAdmin
                            categories={categories}
                            setCategory={setCategory}
                            categoryId={category?.id}/>


                </div>


                <div className="flex-1  grid-rows-[auto_1fr]">
                    <div className="flex justify-between items-center p-3 pb-6">
                        <h1 className="text-lg font-bold  ">

                            {category?.name || "All categories"}
                        </h1>
                        <BackButton title="Back"/>
                    </div>
                    {!category?.id && <ul
                        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-3 gap-0.5 sm:px-3 px-0">
                        {categories?.length > 0 ? categories?.map((category) => (
                                <li
                                    key={category.id}>
                                    <CategoriesCard category={category}/>
                                </li>
                            )) :
                            <li className="flex justify-center items-center col-span-full">
                                <div>
                                    <Image src={NotFoundPhoto} alt="not found photo"/>
                                </div>
                            </li>
                        }
                    </ul>}


                    {category?.id && <ul
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:gap-3 gap-0.5 sm:px-3 px-0">
                        {category?.children?.length > 0 ? category?.children?.map((category) => (
                                <li
                                    key={category.id}>
                                    <CategoriesCard category={category}/>
                                </li>
                            )) :
                            <li>
                                <CategoriesCard category={category}/>

                            </li>
                        }
                    </ul>}

                </div>
            </div>
        </div>
    );
};

export default CategoriesItems;