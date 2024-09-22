"use client"
import React, {useState, useRef, useEffect} from 'react';
import SearchDrawer from "@/app/components/Drawer/SearchDrawer";

const Search = () => {
    const drawerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);


    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };



    const handleClickOutside = (event) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
            setIsOpen(false);
        }
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
            <div className="flex">
                <input
                    type="text"
                    onClick={toggleDrawer}
                    placeholder="Search"
                    className="h-[40px] w-full px-3 border-2 border-blue-500 rounded-l-lg "/>
                <button type="button"
                        className="h-[40px] w-[100px] px-3 col-span-3 border-2 border-blue-500 rounded-r-lg bg-blue-500 text-white">Search
                </button>
            </div>
            <SearchDrawer isOpen={isOpen} setIsOpen={setIsOpen} toggleDrawer={toggleDrawer} />
        </div>
    );
};

export default Search;