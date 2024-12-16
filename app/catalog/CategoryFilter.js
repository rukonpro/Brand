"use client";

import { useState } from "react";

export default function CategoryFilter() {
    const [showAll, setShowAll] = useState(false);
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const toggleOpenCategory = () => {
        setIsOpenCategory(!isOpenCategory);
    };

    // Full category list
    const categories = [
        "Laptop cases",
        "Phone Cables & Converters",
        "Keyboard Accessories",
        "Macbooks",
        "Basic Mice",
        "USB Hubs",
        "Phone Wall Chargers",
        "Laptop Stands",
        "Mac Hard Covers",
        "Type C-Video Adapters",
        "PC Gadgets",
        "Phone Docks & Stands",
        "Microphones",
        "Throttle Body Spacers",
        "Home Office Desks",
        "Phone Screen Protectors",
        "Mini-SAS Cables",
        "Used Laptops",
        "Webcams",
        "PC Display Screen Protectors",
    ];

    // Control how many items to display initially
    const visibleCategories = showAll ? categories : categories.slice(0, 10);

    return (
        <div className="border-b  p-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpenCategory}>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Category</h3>
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transform transition-transform ${isOpenCategory ? 'rotate-180' : 'rotate-0'
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

            {isOpenCategory && (
                <div className="p-4">

                    <ul className="space-y-2 text-sm text-gray-600">
                        {visibleCategories.map((category, index) => (
                            <li key={index} className="hover:text-blue-500 cursor-pointer">
                                {category}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-blue-500 mt-4 font-medium hover:underline"
                    >
                        {showAll ? "VIEW LESS" : "VIEW MORE"}
                    </button>
                </div>
            )}
        </div>
    );
}
