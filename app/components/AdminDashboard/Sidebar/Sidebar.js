"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaBox, FaShoppingCart, FaUsers, FaChartLine } from 'react-icons/fa';
import { MdCategory } from "react-icons/md";
import { SiSpringCreators } from "react-icons/si";
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className={`bg-gray-800 dark:bg-slate-800 text-white h-screen transition-all ${isOpen ? 'w-64' : 'w-16'} duration-300`}>
            <div className="flex items-center justify-between p-4">
                <h1 className={`${isOpen ? 'block' : 'hidden'} text-xl font-bold`}>Admin</h1>
                <button
                    onClick={toggleSidebar}
                    className="bg-gray-700 p-2 rounded focus:outline-none">
                    ☰
                </button>
            </div>
            <nav className="mt-5">
                <ul>
                    <li className="hover:bg-gray-700 p-3">
                        <Link href="/admin/dashboard" className="flex items-center">
                            <FaHome className="text-xl mr-3"/>
                            <span className={`${isOpen ? 'block' : 'hidden'}`}>Dashboard</span>

                        </Link>
                    </li>
                    <li className="hover:bg-gray-700 p-3">
                        <Link href="/admin/dashboard/creator" className="flex items-center">
                            <SiSpringCreators className="text-xl mr-3"/>
                            <span className={`${isOpen ? 'block' : 'hidden'}`}>Creators</span>

                        </Link>
                    </li>
                    <li className="hover:bg-gray-700 p-3">
                        <Link href="/admin/dashboard/categories" className="flex items-center">
                            <MdCategory className="text-xl mr-3"/>
                            <span className={`${isOpen ? 'block' : 'hidden'}`}>Categories</span>

                        </Link>
                    </li>
                    <li className="hover:bg-gray-700 p-3">
                        <Link href="/" className="flex items-center">
                            <FaBox className="text-xl mr-3"/>
                            <span className={`${isOpen ? 'block' : 'hidden'}`}>Products</span>

                        </Link>
                    </li>
                    <li className="hover:bg-gray-700 p-3">
                        <Link href="/" className="flex items-center">

                            <FaShoppingCart className="text-xl mr-3"/>
                            <span className={`${isOpen ? 'block' : 'hidden'}`}>Orders</span>

                        </Link>
                    </li>
                    <li className="hover:bg-gray-700 p-3">

                        <Link href="/" className="flex items-center">
                            <FaUsers className="text-xl mr-3"/>
                            <span className={`${isOpen ? 'block' : 'hidden'}`}>Customers</span>
                        </Link>

                    </li>
                    <li className="hover:bg-gray-700 p-3">

                        <Link href="/" className="flex items-center">
                            <FaChartLine className="text-xl mr-3"/>
                            <span className={`${isOpen ? 'block' : 'hidden'}`}>Analytics</span>
                        </Link>

                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
