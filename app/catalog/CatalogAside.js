"use client"
import React, { useState } from 'react';

const CatalogAside = () => {
    const [cetagoryMenu, setCategoryMenu] = useState(false);
    const [brandMenu, setBrandMenu] = useState(false);
    return (
        <aside className=" col-span-4 bg-white p-3 rounded-lg hidden md:block">
            <div className="inline-block text-left w-full">
                <button onClick={() => setCategoryMenu(state => !state)} type="button"
                    className="inline-flex justify-between w-full rounded-md  border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Category
                    {/* Heroicon name: solid/chevron-down */}
                    <svg
                        className={`-mr-1 ml-2 h-5 w-5 ${cetagoryMenu ? "rotate-0" : "rotate-180"} duration-700 transition`}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd"
                            d="M10.707 13.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4z"
                            clipRule="evenodd" />
                    </svg>
                </button>
                {cetagoryMenu && (
                    <div
                        className="  focus:outline-none text-black  duration-700 transition"
                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div className="py-1" role="none">
                            {/* Dropdown items */}
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem" tabIndex="-1" id="menu-item-0">Mobile accessory</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem" tabIndex="-1" id="menu-item-1">Electronics</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem" tabIndex="-1" id="menu-item-2">Smartphones</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem" tabIndex="-1" id="menu-item-2"> Modern tech</a>
                        </div>
                    </div>
                )}
            </div>
            <div className="inline-block text-left w-full">
                <button onClick={() => setBrandMenu(state => !state)} type="button"
                    className="inline-flex justify-between w-full rounded-md  border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Brands
                    {/* Heroicon name: solid/chevron-down */}
                    <svg
                        className={`-mr-1 ml-2 h-5 w-5 ${brandMenu ? "rotate-0" : "rotate-180"} duration-700 transition`}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd"
                            d="M10.707 13.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4z"
                            clipRule="evenodd" />
                    </svg>
                </button>
                {brandMenu && (
                    <div
                        className="  focus:outline-none text-black  duration-700 transition"
                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div className="py-1" role="none">
                            {/* Dropdown items */}
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem" tabIndex="-1" id="menu-item-0">Samsung</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem" tabIndex="-1" id="menu-item-1">Apple</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem" tabIndex="-1" id="menu-item-2">Huawei</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem" tabIndex="-1" id="menu-item-2"> Pocco</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem" tabIndex="-1" id="menu-item-2"> Lenovo</a>
                        </div>
                    </div>
                )}
            </div>

        </aside>
    );
};

export default CatalogAside;