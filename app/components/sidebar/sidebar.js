"use client"
import React from "react";
import Link from 'next/link';
import { profileMenu } from "@/app/components/navbar/profileDrawer";
import Image from "next/image";

import SingInIcon from "@/public/images/sign-in-alt-svgrepo-com.svg";
import SingOutIcon from "@/public/images/sign-out-svgrepo-com.svg";
import ProfileSidebarBanner from "@/app/components/navbar/profileSidebarBanner";
import {signOut} from "next-auth/react";
import Cookies from "js-cookie";
import {useSession} from "next-auth/react";

const Sidebar = () => {

    const {data:userData}=useSession();

    const user=userData?.user
        const logout = async () => {
            await  Cookies.remove('next-auth.session-token');
            await  Cookies.remove('next-auth.csrf-token');
            await  signOut({ callbackUrl: '/login' });
        }

    return (
        <div
            className={`h-full bg-white text-gray-600 dark:bg-slate-800 dark:text-slate-300 transition-transform duration-300 ease-in-out transform rounded-lg overflow-hidden`}
        >
            <ProfileSidebarBanner user={user} />
            <ul className="p-4">
                {
                    profileMenu.map((menu, index) => {
                        return (
                            <li
                                key={index}
                                className="mb-2">
                                <Link href={menu.path}>
                                    <button className="flex items-center gap-2">
                                        <Image height={20} width={20} src={menu.icon} alt={menu.title} />
                                        <p className="hover:text-blue-500 hidden md:block">{menu.title}</p>
                                    </button>
                                </Link>
                            </li>
                        )
                    })
                }

                {!user?.email ? <li>
                    <Link href="/login" >
                        <button type="button"
                            className="flex items-center gap-2"
                        >
                            <div className="flex items-center gap-4">
                                <Image src={SingInIcon} alt='avater' height={20} width={20} /> Sign In
                            </div>
                        </button>
                    </Link>
                </li> :
                    <li>
                        <button type="button"
                            className="flex items-center gap-2"
                            onClick={logout}
                        >
                            <div className="flex items-center gap-4">
                                <Image src={SingOutIcon} alt='avater' className="h-5 w-5" />
                                Sign Out
                            </div>

                        </button>
                    </li>
                }
            </ul>
        </div>
    );
};

export default Sidebar;