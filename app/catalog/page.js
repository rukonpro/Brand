"use client"
import React, {useState} from 'react';
import Navbar from "@/app/components/navbar/navbar";
import Nav from "@/app/components/navbar/nav";
import Footer from "@/app/components/Footer/Footer";
import  GridViewIcon from "@/public/images/gridview.png";
import LineViewIcon from "@/public/images/listview.png";
import Image from "next/image";
import fakeData from "@/app/FakeData/FakeData";

const Catalog = () => {

    const [isOpen, setIsOpen] = useState(false);
const [view,setView]=useState("grid-cols-1")
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <Navbar/>
            <Nav/>


            <div className="flex gap-4 py-3 max-w-[1200px] mx-auto">
                <aside className="w-72 bg-white p-3 rounded-lg">
                    <div className="inline-block text-left w-full">
                        <button onClick={toggleMenu} type="button"
                                className="inline-flex justify-between w-full rounded-md  border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Category
                            {/* Heroicon name: solid/chevron-down */}
                            <svg
                                className={`-mr-1 ml-2 h-5 w-5 ${isOpen ? "rotate-0" : "rotate-180"} duration-700 transition`}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M10.707 13.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                        {isOpen && (
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
                        <button onClick={toggleMenu} type="button"
                                className="inline-flex justify-between w-full rounded-md  border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Brands
                            {/* Heroicon name: solid/chevron-down */}
                            <svg
                                className={`-mr-1 ml-2 h-5 w-5 ${isOpen ? "rotate-0" : "rotate-180"} duration-700 transition`}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M10.707 13.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                        {isOpen && (
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
                    <div className="inline-block text-left w-full">
                        <button onClick={toggleMenu} type="button"
                                className="inline-flex justify-between w-full rounded-md  border-gray-300 shadow-sm bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Features
                            {/* Heroicon name: solid/chevron-down */}
                            <svg
                                className={`-mr-1 ml-2 h-5 w-5 ${isOpen ? "rotate-0" : "rotate-180"} duration-700 transition`}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M10.707 13.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                        {isOpen && (
                            <div
                                className="  focus:outline-none text-black  duration-700 transition"
                                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    <label htmlFor="item1"
                                           className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                           role="menuitem" tabIndex="-1">
                                        <input
                                            type="checkbox"
                                            id="item1"
                                            className="mr-2"
                                        />
                                        Metallic
                                    </label>
                                    <label htmlFor="item1"
                                           className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                           role="menuitem" tabIndex="-1">
                                        <input
                                            type="checkbox"
                                            id="item1"
                                            className="mr-2"
                                        />
                                        Plastic cover
                                    </label>
                                    <label htmlFor="item1"
                                           className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                           role="menuitem" tabIndex="-1">
                                        <input
                                            type="checkbox"
                                            id="item1"
                                            className="mr-2"
                                        />
                                        Plastic cover
                                    </label>
                                    <label htmlFor="item1"
                                           className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                           role="menuitem" tabIndex="-1">
                                        <input
                                            type="checkbox"
                                            id="item1"
                                            className="mr-2"
                                        />
                                        8GB Ram
                                    </label>
                                    <label htmlFor="item1"
                                           className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                           role="menuitem" tabIndex="-1">
                                        <input
                                            type="checkbox"
                                            id="item1"
                                            className="mr-2"
                                        />
                                        Super power
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
                <div className="flex-1 inset-0">

                    <div className=" rounded-md w-full flex-row bg-white flex justify-between p-3">
                        <span className="inline-block px-4 py-2 text-sm text-gray-700">
                            12,911 items in Mobile accessory
                        </span>

                        <div className="flex items-center gap-4">
                            <label htmlFor="item1"
                                   className="flex items-center px-4 py-2 text-sm text-gray-700"
                                   role="menuitem" tabIndex="-1">
                                <input
                                    type="checkbox"
                                    id="item1"
                                    className="mr-2"
                                />
                                Verified only
                            </label>

                            <button type="button"
                            onClick={()=>setView("grid-cols-3")}
                            >
                                <Image src={GridViewIcon} alt="grid view icon"/>
                            </button>
                            <button type="button"
                                    onClick={()=>setView("grid-cols-1")}
                            >
                                <Image src={LineViewIcon} alt="Line view icon"/>
                            </button>
                        </div>

                    </div>


                    <div className="mt-4">
                        <ol className={`grid ${view} gap-4`}>
                            {
                                fakeData.products.map((product, index) => {
                                    return (
                                        <li key={index}>
                                            <div className=" grid grid-cols-12 gap-4 bg-white p-3 rounded-lg">
                                                <div className={`${view === "grid-cols-1" ? "col-span-2" : "col-span-12"}  flex justify-center`}>
                                                    <Image src={product.image} height={100} width={100} alt={product.title}/>
                                                </div>
                                                <div className={view==="grid-cols-3"?"col-span-12":"col-span-10"}>
                                                    <h1 className="text-xl font-bold text-gray-500">{product.title}</h1>
                                                    <p className="text-2xl font-bold text-gray-600 pt-2">${product.price}</p>

                                                    <p className="text-md text-gray-500 p-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                        eiusmod
                                                        tempor incididunt ut labore et dolore magna aliqua</p>


                                                    <button type="button" className="text-blue-500 mt-2">
                                                        View details
                                                    </button>
                                                </div>


                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    </div>
                </div>


            </div>


            <Footer/>
        </div>
    );
};

export default Catalog;