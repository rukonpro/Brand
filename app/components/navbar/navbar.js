import React  from 'react';
import Image from 'next/image'
import Logo from "@/public/images/logo-colored.png";
import Love from "@/public/images/love.png";
import Chat from "@/public/images/chat.png";
import Cart from "@/public/images/cart.png";
import Search from "@/app/components/Search/Search";
import MenuIcon from "@/public/images/menu.png"
import Link from "next/link";
import ProfileDrawer from "@/app/components/navbar/profileDrawer";

const Navbar = () => {

    return (
        <nav className='bg-white px-3 py-3 w-full '>
            <div className="grid grid-cols-12 max-w-[1200px] mx-auto py-8 items-center gap-4">
                <div className="h-[46px] w-[150px] md:col-span-2 col-span-6 ">
                  <div className="grid grid-cols-4 items-center">
                     <div className="col-span-1 md:hidden block">
                        <button type="button">
                            <Image src={MenuIcon} alt="MenuIcon"/>
                        </button>
                     </div>
                    <div className="md:col-span-4 col-span-3">
                       <Link href="/">
                           <Image src={Logo} alt="Logo"/>
                       </Link>
                    </div>
                  </div>
                </div>
                <div className="col-span-6 md:block hidden">
                    <Search/>
                </div>

                <div className="grid grid-cols-4  items-center md:col-span-4 col-span-6">

                    <div>
                        <Link href="/profiles/messenger">
                            <div className="flex justify-center">
                                <div className="flex justify-center">
                                    <Image src={Chat} alt='Chat icon'/>
                                </div>
                            </div>
                            <p className="text-sm text-center sm:block hidden">Massage</p>
                        </Link>
                    </div>
                    <div>
                        <Link href="/profiles/myOrders">
                            <div className="flex justify-center">
                                <Image src={Love} alt='Love icon'/>
                            </div>
                            <p className="text-sm text-center sm:block hidden">Orders</p>
                        </Link>
                    </div>
                    <div>


                        <Link href="/profiles/myCart">
                            <div className="flex justify-center relative">

                                <Image src={Cart} alt='card icon'/>
                                <span className="relative flex h-7 w-7">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
  <span className="relative inline-flex rounded-full h-7 w-7 bg-sky-500 text-xs flex justify-center items-center text-white font-bold">10</span>
</span>
                            </div>
                            <p className="text-sm text-center sm:block hidden">My Cart</p>
                        </Link>
                    </div>
                        <ProfileDrawer/>
                </div>

            </div>
            <div className=" md:hidden block ">
                <Search/>
            </div>

        </nav>
    );
};

export default Navbar;