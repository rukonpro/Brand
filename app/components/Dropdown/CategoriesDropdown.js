"use client"
import React, {useState,useRef,useEffect} from 'react';
import {BsThreeDotsVertical} from "react-icons/bs";
const CategoriesDropdown = ({children}) => {
    const dropdownRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };



    // Handle click outside to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);



    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
                onClick={toggleDropdown}
                className="absolute right-1 top-1 p-1 backdrop-blur-3xl bg-slate-300/50 rounded-full">
                <BsThreeDotsVertical/>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div className="absolute mt-8 bg-white dark:bg-slate-700 rounded shadow-lg w-36 right-0 z-10">
                   {children}
                </div>
            )}
        </div>
    );
};

export default CategoriesDropdown;



//  <button
//                         onClick={() => {
//                             setDropdownOpen(false);
//                         }}
//                         className="flex gap-3 items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 w-full"
//                     >
//                     <MdEdit/>  update
//                     </button>
//                     <button
//                         onClick={() => {
//                             setDropdownOpen(false);
//                         }}
//                         className="flex gap-3 items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 w-full"
//                     >
//                         {/* Light Mode Icon (Sun) */}

//                         <MdDelete /> Delete
//                     </button>
//                     <button
//                         onClick={() => {
//                             setDropdownOpen(false);
//                         }}
//                         className="flex gap-3 items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 w-full"
//                     >
//                      <MdCreateNewFolder/>  Create
//                     </button>