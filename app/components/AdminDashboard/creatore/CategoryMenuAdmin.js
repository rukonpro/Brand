import React, { useState } from 'react';

const NestedDropdown = ({ category,setCategory,categoryId }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="relative group  w-full">

            {
                category?.children?.length === 0 || !category?.children ?(


                            <button
                                onClick={() => setCategory(category)}
                                className={`${category?.id  === categoryId? "dark:bg-slate-600 bg-blue-600 text-slate-200" : ""} my-0.5 py-2 px-4 flex justify-between items-center w-full text-left hover:bg-blue-500 hover:text-white hover:dark:bg-slate-700 rounded-lg`}>
                                {category?.name}
                            </button>


                    ) :
                    (

                            <button
                                onClick={() => {
                                    setIsOpen(!isOpen)
                                    setCategory(category)
                                }}
                                className={`${category?.id === categoryId ? "dark:bg-slate-600 bg-blue-600 text-slate-200" : ""} my-0.5 py-2 px-4 flex justify-between items-center w-full text-left hover:bg-blue-500 hover:text-white hover:dark:bg-slate-700 rounded-lg`}
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
                <ul className="ml-4 pl-4 border-l border-blue-500 dark:border-slate-700">
                    {category?.children?.map((child) => (
                        <NestedDropdown
                            key={child?.id}
                            category={child}
                            setCategory={setCategory}
                            categoryId={categoryId}
                             />
                    ))}
                </ul>
            )}
        </li>
    );
};

const CategoryManuAdmin = ({categories,setCategory,categoryId}) => {

    return (
        <nav>
            <h1 className="text-lg px-3 py-4  z-10 mb-1 font-bold text-blue-500 dark:text-slate-200 ">Categorise</h1>
            <ul className="menu bg-base-200 rounded-box overflow-y-auto p-1 border-2 border-slate-50 rounded-lg dark:border-slate-700 dark:text-slate-200">
                {categories?.map((category) => (
                    <NestedDropdown
                        key={category?.id}
                        category={category}
                        setCategory={setCategory}
                        categoryId={categoryId}
                        />
                ))}
            </ul>
        </nav>
    );
};

export default CategoryManuAdmin;