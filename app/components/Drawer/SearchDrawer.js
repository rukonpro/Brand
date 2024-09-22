// components/SearchDrawer.js

import React, { useState } from 'react';

const SearchDrawer = ({isOpen,toggleDrawer}) => {

    const [searchQuery, setSearchQuery] = useState('');



    const handleSearch = (e) => {
        e.preventDefault();
       const searchValue=e.target.value;
       setSearchQuery(searchValue);
       console.log(searchQuery);
    };

    return (
        <div>
             <div className={`fixed  top-0 left-0 right-0 inset-0 z-50 overflow-hidden  duration-700  ${isOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={toggleDrawer}>
                    <div className="absolute inset-0 bg-slate-700/50 "></div>
                </div>
                <div
                    className={`fixed top-0 left-0 right-0 mx-auto flex  w-full bg-white shadow-xl transform transition ease-in-out duration-300 overflow-y-auto`}>
                    <div className="w-full ">
                        <div className="max-w-[1200px] mx-auto py-10">
                            <div className="flex items-center justify-between ">
                                            <h2 className="text-lg font-semibold">Search Products</h2>
                                            <button onClick={toggleDrawer} className="text-gray-600">
                                                X
                                            </button>
                                        </div>
                            <div className="flex w-4/6 mx-auto  pb-10 pt-5">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    onChange={handleSearch}
                                    className="h-[40px] w-full px-3 border-2 border-blue-500 rounded-l-lg "/>
                                <button type="button"
                                        className="h-[40px] w-[100px] px-3 col-span-3 border-2 border-blue-500 rounded-r-lg bg-blue-500 text-white">Search
                                </button>
                            </div>

                            <div className=" border-t-2 border-blue-500 py-2">

                                <p>Product name</p>
                                <p>Product name</p>
                                <p>Product name</p>
                                <p>Product name</p>
                                <p>Product name</p>
                                <p>Product name</p>
                                <p>Product name</p>
                                <p>Product name</p>


                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default SearchDrawer;
