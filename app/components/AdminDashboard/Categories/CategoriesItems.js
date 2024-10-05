"use client"
import React, {useState} from 'react';
import BackButton from "@/app/components/BackButtons/BackButton";
import CategoriesCard from "@/app/components/AdminDashboard/Categories/CategoriesCard";
import NotFoundPhoto from "@/public/images/not-found.png"
import Image from "next/image";
import CategoryManuAdmin from "@/app/components/AdminDashboard/creatore/CategoryMenuAdmin";
const CategoriesItems = ({categories}) => {

    const [category,setCategory]=useState({});



    return (
        <div>


            <div className="grid grid-cols-12">
                <div className="col-span-2">

                        <CategoryManuAdmin
                            categories={categories}
                            setCategory={setCategory}
                            categoryId={category?.id}/>


                </div>


                <div className="col-span-10">
                    <div className="flex justify-between items-center p-3 pb-6">
                        <h1 className="text-lg font-bold  ">

                            {category?.name || "All categories"}
                        </h1>
                        <BackButton title="Back"/>
                    </div>
                    {!category?.id && <ul
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:gap-3 gap-0.5 sm:px-3 px-0">
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