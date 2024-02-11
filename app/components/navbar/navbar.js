import React from 'react';
import Image from 'next/image'
import Logo from "@/public/images/logo-colored.png";
import Avater from "@/public/images/avater.png";
import Love from "@/public/images/love.png";
import Chat from "@/public/images/chat.png";
import Cart from "@/public/images/cart.png";
import Nav from './nav';


const Navbar = () => {
    return (
        <nav className='bg-white'>
            <div className="grid grid-cols-12 max-w-[1200px] mx-auto py-8 ">
                <div className="h-[46px] w-[150px] col-span-2">
                    <Image src={Logo} alt="Logo"
                    />
                </div>
                <div className="grid grid-cols-12 col-span-7">
                    <div className="col-span-6">
                        <input
                            type="text"
                            placeholder="Search"
                            className="h-[40px] w-full px-3 border-2 border-blue-500 rounded-l-lg " />
                    </div>
                    <div className="col-span-6">
                        <select className="h-[40px] w-[145px] px-3 border-2 border-x-0 border-blue-500">
                            <option value="All category">All category</option>
                            <option value="All category">All category</option>
                        </select>

                        <button type="button"
                            className="h-[40px] w-[100px] px-3 col-span-3 border-2 border-blue-500 rounded-r-lg bg-blue-500 text-white"
                        >Search
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-4 col-span-3">
                    <div>
                        <div className="flex justify-center">
                            <Image src={Avater} alt='' />
                        </div>
                        <p className="text-center">Profile</p>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <div className="flex justify-center">
                                <Image src={Chat} alt='' />
                            </div>
                        </div>
                        <p className="text-center">Massage</p>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <Image src={Love} alt='' />
                        </div>

                        <p className="text-center">Orders</p>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <Image src={Cart} alt='' />
                        </div>

                        <p className="text-center">My Cart</p>
                    </div>
                </div>
            </div>
            <Nav />
        </nav>
    );
};

export default Navbar;