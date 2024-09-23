import React  from 'react';
import Image from 'next/image'
import Logo from "@/public/images/logo-colored.png";
import Love from "@/public/images/love.png";
import Chat from "@/public/images/chat.png";
import Cart from "@/public/images/cart.png";
import Search from "@/app/components/Search/Search";
import Link from "next/link";
import ProfileDrawer from "@/app/components/navbar/profileDrawer";
import NavCart from "@/app/components/navbar/navCart";
import CategoryDrawer from "@/app/components/navbar/CategoryDrawer";
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";


const Navbar = async () => {
    const category=await getAllCategory();
    return (
        <nav className='bg-white dark:bg-slate-700 dark:text-stone-100 px-3 py-3 w-full '>
            <div className="grid grid-cols-12 max-w-[1200px] mx-auto py-8 items-center gap-4">
                <div className="h-[46px] w-[150px] md:col-span-2 col-span-6 ">
                  <div className="grid grid-cols-4 items-center">
                     <div className="col-span-1 md:hidden block">
                        <CategoryDrawer categories={category?.data} />
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
                        <Link href="/messenger">
                            <div className="flex justify-center">
                                <div className="flex justify-center">
                                    <Image src={Chat} alt='Chat icon'/>
                                </div>
                            </div>
                            <p className="text-sm text-center  sm:block hidden">Massage</p>
                        </Link>
                    </div>
                    <div>
                        <Link href="/myOrders">
                            <div className="flex justify-center">
                                <Image src={Love} alt='Love icon'/>
                            </div>
                            <p className="text-sm text-center sm:block hidden">Orders</p>
                        </Link>
                    </div>
                    <div>


                        <Link href="/myCart">
                            <div className="flex justify-center relative">

                                <Image src={Cart} alt='card icon'/>


      <NavCart/>


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