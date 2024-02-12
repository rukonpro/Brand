import React from 'react';

const Search = () => {
    return (
            <div className="flex">
                    <input
                        type="text"
                        placeholder="Search"
                        className="h-[40px] w-full px-3 border-2 border-blue-500 rounded-l-lg "/>
                    <button type="button"
                            className="h-[40px] w-[100px] px-3 col-span-3 border-2 border-blue-500 rounded-r-lg bg-blue-500 text-white">Search
                    </button>
            </div>
    );
};

export default Search;