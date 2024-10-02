"use client"
import React, {useState} from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
import { MdEdit ,MdDelete,MdCreateNewFolder} from "react-icons/md";
const CategoriesDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="relative">
            {/* Dropdown Button */}
            <button
                onClick={toggleDropdown}
                className="absolute right-1 top-1 p-1 backdrop-blur-3xl bg-slate-300/50 rounded-full">
                <BsThreeDotsVertical/>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div className="absolute mt-8 bg-white dark:bg-slate-700 rounded shadow-lg w-48 right-0 z-50">
                    <button
                        onClick={() => {
                            setDropdownOpen(false);
                        }}
                        className="flex gap-3 items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 w-full"
                    >
                    <MdEdit/>  update
                    </button>
                    <button
                        onClick={() => {
                            setDropdownOpen(false);
                        }}
                        className="flex gap-3 items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 w-full"
                    >
                        {/* Light Mode Icon (Sun) */}

                        <MdDelete /> Delete
                    </button>
                    <button
                        onClick={() => {
                            setDropdownOpen(false);
                        }}
                        className="flex gap-3 items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 w-full"
                    >
                     <MdCreateNewFolder/>  Create
                    </button>
                </div>
            )}
        </div>
    );
};

export default CategoriesDropdown;