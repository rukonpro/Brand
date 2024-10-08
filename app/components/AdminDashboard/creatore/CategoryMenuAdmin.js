import React, { useState } from 'react';
import CategoryDropdownButton from '../Categories/CategoryDropdownButton';

const NestedDropdown = ({ category, setCategory, categoryId, handleSetCategoryId, handleOpenModal, setCategoryId }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="relative group  w-full">

            {
                category?.children?.length === 0 || !category?.children ? (

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => {
                                if (setCategory) {
                                    setCategory(category)
                                }
                                if (setCategoryId) {
                                    setCategoryId(category?.id)
                                }

                                if (handleSetCategoryId) {
                                    handleSetCategoryId(category?.id)
                                }

                            }}
                            className={`${category?.id === categoryId ? "dark:bg-slate-600 bg-blue-600 text-slate-200" : ""} my-0.5 py-2 px-4 flex justify-between items-center w-full text-left hover:bg-blue-500 hover:text-white hover:dark:bg-slate-700 rounded-lg`}>
                            {category?.name}
                        </button>

                        <CategoryDropdownButton
                            category={category}
                            setCategoryId={setCategoryId}
                            handleOpenModal={handleOpenModal}
                        />
                    </div>


                ) :
                    (

                        <div>

                            <CategoryDropdownButton
                                handleOpenModal={handleOpenModal}
                                setCategoryId={setCategoryId} 
                                category={category}
                                />
                            <button
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                    if (setCategory) {
                                        setCategory(category)
                                    }
                                    if (setCategoryId) {
                                        setCategoryId(category?.id)
                                    }
    
                                    if (handleSetCategoryId) {
                                        handleSetCategoryId(category?.id)
                                    }
                                }}
                                type="button"
                                className={`${category?.id === categoryId ? "dark:bg-slate-600 bg-blue-600 text-slate-200" : ""} my-0.5 py-2 px-4 flex justify-between items-center w-full text-left hover:bg-blue-500 hover:text-white hover:dark:bg-slate-700 rounded-lg`}
                            >

                                {category?.name}

                                {category?.children?.length > 0 && (
                                    <svg
                                        className={`w-4 h-4 relative right-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
                        </div>

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
                            handleSetCategoryId={handleSetCategoryId}
                            handleOpenModal={handleOpenModal}
                            setCategoryId={setCategoryId}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

const CategoryManuAdmin = ({ categories, setCategory, categoryId, handleSetCategoryId, handleOpenModal, setCategoryId }) => {

    return (
        <nav>
            <h1 className=" px-3   z-10 mb-1  text-blue-500 dark:text-slate-200 ">Categorise</h1>
            <ul className="menu bg-base-200 rounded-box p-1 border-2 border-slate-50 rounded-lg dark:border-slate-700 dark:text-slate-200 h-full overflow-y-auto">
                <li className="relative group  w-full">
                    <button
                        type="button"
                        onClick={() => setCategory({})}
                        className={`${!categoryId ? "dark:bg-slate-600 bg-blue-600 text-slate-200" : ""} my-0.5 py-2 px-4 flex justify-between items-center w-full text-left hover:bg-blue-500 hover:text-white hover:dark:bg-slate-700 rounded-lg`}
                    >All Category</button>
                </li>
                {categories?.map((category) => (
                    <NestedDropdown
                        key={category?.id}
                        category={category}
                        setCategory={setCategory}
                        categoryId={categoryId}
                        handleSetCategoryId={handleSetCategoryId}
                        handleOpenModal={handleOpenModal}
                        setCategoryId={setCategoryId}
                    />
                ))}
            </ul>
        </nav>
    );
};

export default CategoryManuAdmin;