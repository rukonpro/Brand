import React  from 'react';
import Image from 'next/image'
import Logo from "@/public/images/logo-colored.png";
import { RxHeartFilled } from "react-icons/rx";
import { BsChatLeftDotsFill } from "react-icons/bs";
import { BsFillCartPlusFill } from "react-icons/bs";
import Search from "@/app/components/Search/Search";
import Link from "next/link";
import ProfileDrawer from "@/app/components/navbar/profileDrawer";
import NavCart from "@/app/components/navbar/navCart";
import CategoryDrawer from "@/app/components/navbar/CategoryDrawer";
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";
import DarkAndLightModeController from "@/app/components/Dropdown/DarkAndLightModeController";


const Navbar = async () => {
    const category=await getAllCategory();
    return (
        <nav className='bg-white dark:bg-slate-800 dark:text-stone-100 px-3 py-3 w-full '>
            <div className="grid grid-cols-12 max-w-[1200px] mx-auto  items-center gap-4">
                <div className="md:col-span-2 col-span-5 flex items-center ">
                  <div className="grid grid-cols-4 items-center ">
                     <div className="col-span-1 md:hidden block items-center ">
                        <CategoryDrawer categories={category?.data} />
                     </div>
                    <div className="md:col-span-4 col-span-3">
                       <Link href="/">
                           <Image src={Logo} width={100} height="auto" alt="Logo"/>
                       </Link>
                    </div>
                  </div>
                </div>
                <div className="col-span-5 md:block hidden">
                    <Search/>
                </div>

                <div className="grid grid-cols-5  items-center md:col-span-5 col-span-7">

                    <div>
                        <Link href="/messenger">
                            <div className="flex justify-center">
                                <div className="flex justify-center">
                                    <BsChatLeftDotsFill size={25} className="text-gray-400" />
                                </div>
                            </div>
                            <p className="text-sm text-center  sm:block hidden">Massage</p>
                        </Link>
                    </div>
                    <div>
                        <Link href="/myOrders">
                            <div className="flex justify-center">
                                <RxHeartFilled size={25} className="text-gray-400"/>
                            </div>
                            <p className="text-sm text-center sm:block hidden">Orders</p>
                        </Link>
                    </div>
                    <div>


                        <Link href="/myCart">
                            <div className="flex justify-center relative">

                                <BsFillCartPlusFill size={25} className="text-gray-400"/>


      <NavCart/>


                            </div>
                            <p className="text-sm text-center sm:block hidden">My Cart</p>
                        </Link>
                    </div>
                        <ProfileDrawer/>
                    <DarkAndLightModeController/>
                </div>

            </div>
            <div className=" md:hidden block pt-3">
                <Search/>
            </div>

        </nav>
    );
};

export default Navbar;