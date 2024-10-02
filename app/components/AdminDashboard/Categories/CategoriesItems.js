"use client"
import React, {useState} from 'react';
import BackButton from "@/app/components/BackButtons/BackButton";
import CategoriesCard from "@/app/components/AdminDashboard/Categories/CategoriesCard";
import NotFoundPhoto from "@/public/images/not-found.png"
import Image from "next/image";
import CategoryManuAdmin from "@/app/components/AdminDashboard/creatore/CategoryMenuAdmin";
const CategoriesItems = ({categories,name}) => {

    const [categoryId,setCategoryId]=useState("");
    return (
        <div>
            <div className="flex justify-between items-center p-3 pb-6">
                <h1 className="text-lg font-bold  ">

                    {name || "All categories"}
                </h1>
                <BackButton title="Back"/>
            </div>

            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:gap-3 gap-0.5 sm:px-3 px-0">
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
            </ul>


            <div className="grid grid-cols-2">
                <div>
                    <CategoryManuAdmin
                        categories={categories}
                        setCategoryId={setCategoryId}
                        categoryId={categoryId}/>
                </div>
                <div>
<p>{categoryId}</p>
                </div>
            </div>
        </div>
    );
};

export default CategoriesItems;