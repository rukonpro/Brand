"use client";

import { useState } from "react";

export default function BrandFilter({ brands }) {
    const [limitBrand, setLimitBrand] = useState(10);
    const [isOpenBrand, setIsOpenBrand] = useState(false);

    const toggleOpenBrand = () => {
        setIsOpenBrand(!isOpenBrand);
    };


    return (
        <div className=" p-4 border-b">

            <div >
                {/* Clickable header for toggling */}
                <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpenBrand}>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Brand</h3>
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transform transition-transform ${isOpenBrand ? 'rotate-180' : 'rotate-0'
                                }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Brand checkboxes that are conditionally rendered based on `isOpen` */}
                {isOpenBrand && (
                    <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                            {brands.map((brand, index) => (
                                <li key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`brand-${index}`}
                                        className="mr-2 w-4 h-4 text-blue-500 border-gray-300 focus:ring focus:ring-blue-300"
                                    />
                                    <label htmlFor={`brand-${index}`} className="cursor-pointer">
                                        {brand}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setLimitBrand((prev) => prev + 10)}
                            className="text-blue-500 mt-4 font-medium hover:underline"
                        >
                            {"VIEW MORE"}
                        </button>
                    </div>

                )}


            </div>

        </div>
    );
}
