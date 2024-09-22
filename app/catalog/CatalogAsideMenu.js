"use client"
import React, { useState } from 'react';
import Link from "next/link";
import PriceRangeFilter from "@/app/catalog/PriceRange";

const NestedDropdown = ({ category }) => {
    const [isOpen, setIsOpen] = useState(false);



    return (
        <li className="relative group  w-full">

            {
                category?.children?.length === 0 || !category?.children ?(
                        <Link href={`/source/${category?.id}`}>
                            <button  className="py-2 px-4 flex justify-between items-center w-full text-left  rounded-lg">
                                {category?.name}
                            </button>
                        </Link>
                    ):
                    (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="py-2 px-4 flex justify-between items-center w-full text-left  rounded-lg"
                        >

                            {category?.name}

                            {category?.children?.length > 0 && (
                                <svg
                                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            )}
                        </button>
                    )
            }


            {isOpen && category?.children?.length > 0 && (
                <ul className="ml-4 pl-4 border-l ">
                    {category?.children?.map((child) => (
                        <NestedDropdown key={child?.id} category={child}/>
                    ))}
                </ul>
            )}
        </li>
    );
};

const CatalogAsideManu = ({categories}) => {
    const [isOpenBrand, setIsOpenBrand] = useState(false);
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const toggleOpenCategory = () => {
        setIsOpenCategory(!isOpenCategory);
    };
    const toggleOpenBrand = () => {
        setIsOpenBrand(!isOpenBrand);
    };
    return (
        <nav className="relative">


           <div className=" p-4 ">
               <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpenCategory}>
                   <h2 className="text-lg font-semibold">Categories</h2>
                   <button>
                       <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className={`h-5 w-5 transform transition-transform ${
                               isOpenCategory ? 'rotate-180' : 'rotate-0'
                           }`}
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                       >
                           <path
                               strokeLinecap="round"
                               strokeLinejoin="round"
                               strokeWidth="2"
                               d="M5 15l7-7 7 7"
                           />
                       </svg>
                   </button>
               </div>

               {isOpenCategory && (
                   <ul className="menu bg-base-200 rounded-box overflow-y-auto px-1">
                       {categories?.map((category) => (
                           <NestedDropdown key={category?.id} category={category}/>
                       ))}
                   </ul>
               )}
           </div>


            <div className=" p-4 border-t">
                {/* Clickable header for toggling */}
                <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpenBrand}>
                    <h2 className="text-lg font-semibold">Brands</h2>
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transform transition-transform ${
                                isOpenBrand ? 'rotate-180' : 'rotate-0'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Brand checkboxes that are conditionally rendered based on `isOpen` */}
                {isOpenBrand && (
                    <div className="mt-4 space-y-2">
                        {['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'].map((brand) => (
                            <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <span>{brand}</span>
                            </label>
                        ))}
                    </div>
                )}

                {/* "See all" button also shown only when the brands are visible */}
                {isOpenBrand && <button className="text-blue-600 mt-4">See all</button>}
            </div>



            <PriceRangeFilter/>
        </nav>
    );
};

export default CatalogAsideManu;


