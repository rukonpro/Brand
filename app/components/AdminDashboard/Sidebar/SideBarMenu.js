import React from 'react';
import Link from "next/link";

const SideBarMenu = () => {
    return (
        <nav className="flex flex-col space-y-4 p-4">
            <Link  href="/admin/dashboard" className="text-gray-300 hover:bg-gray-700 p-2 rounded">
                Dashboard
            </Link>
            <Link href="/admin/dashboard/creator" className="text-gray-300 hover:bg-gray-700 p-2 rounded">
                Creator
            </Link>
            <Link href="/admin/dashboard/categories" className="text-gray-300 hover:bg-gray-700 p-2 rounded">
                Categories
            </Link>
            <Link href="/admin/dashboard/products" className="text-gray-300 hover:bg-gray-700 p-2 rounded">
                Products
            </Link>
        </nav>
    );
};

export default SideBarMenu;