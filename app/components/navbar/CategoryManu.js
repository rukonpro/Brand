"use client"
import React, { useState } from 'react';
import Link from "next/link";

const NestedDropdown = ({ category }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="relative group  w-full">

            {
                category?.children?.length === 0 || !category?.children ?(
                        <Link href={`/source/${category?.id}`}>
                            <button  className="py-2 px-4 flex justify-between items-center w-full text-left hover:bg-blue-500 hover:text-white rounded-lg">
                                {category?.name}
                            </button>
                        </Link>
                    ):
                    (
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="py-2 px-4 flex justify-between items-center w-full text-left hover:bg-blue-500 hover:text-white rounded-lg"
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
                <ul className="ml-4 pl-4 border-l border-blue-500">
                    {category?.children?.map((child) => (
                        <NestedDropdown key={child?.id} category={child}/>
                    ))}
                </ul>
            )}
        </li>
    );
};

const CategoryManu = ({categories}) => {

    return (
        <nav className="relative">
            <h1 className="text-lg px-3 py-4 bg-blue-500 text-white sticky top-0 z-10 mb-1 font-bold">Categorise</h1>
            <ul className="menu bg-base-200 rounded-box overflow-y-auto px-1">
                {categories?.map((category) => (
                    <NestedDropdown key={category?.id} category={category}/>
                ))}
            </ul>
        </nav>
    );
};

export default CategoryManu;


