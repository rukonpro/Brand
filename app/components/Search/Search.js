"use client"
import React, {useState, useRef, useEffect} from 'react';
import SearchDrawer from "@/app/components/Drawer/SearchDrawer";
import {FaSearch} from "react-icons/fa";

const Search = () => {
    const drawerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };



    const handleClickOutside = (event) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleSearchChange = (e) => {
        const searchValue = e.target.value.trim();
        setSearch(searchValue);
    };


    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    return (
        <div>
            <div className="flex justify-end w-auto">
                {/*<input*/}
                {/*    type="text"*/}
                {/*    onClick={toggleDrawer}*/}
                {/*    placeholder="Search"*/}
                {/*    className="h-[40px] w-full px-3 border-2 border-blue-500 rounded-l-lg dark:bg-slate-700 dark:text-stone-100"/>*/}
                {/*<button type="button"*/}
                {/*        className="h-[40px] w-[100px] px-3 col-span-3 border-2 border-blue-500 rounded-r-lg bg-blue-500 text-white">Search*/}
                {/*</button>*/}

                <div className="relative w-full max-w-xs">
                    <input
                        type="text"
                        className="bg-slate-200 dark:bg-slate-700 w-full px-4 py-2 rounded-full focus:outline-none"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearchChange}
                        onClick={toggleDrawer}
                    />
                    <FaSearch className="absolute top-3 right-3 text-gray-400"/>
                </div>
            </div>
            <div>
                <SearchDrawer isOpen={isOpen} setIsOpen={setIsOpen} toggleDrawer={toggleDrawer} search={search} setSearch={setSearch} handleSearchChange={handleSearchChange} />
            </div>
        </div>
    );
};

export default Search;