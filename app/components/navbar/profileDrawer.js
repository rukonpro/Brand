"use client"
import React, {Fragment, useState} from 'react';
import Link from "next/link";
import Drawer from "@/app/components/Drawer/Drawer";
import Image from "next/image";
import Avater from "@/public/images/avatar.png";
import CartOrderIcon from "@/public/images/cart-check-svgrepo-com.svg";
import RightIcon from "@/public/images/right-chevron-svgrepo-com.svg";
import LoveIcon from "@/public/images/love.png";
import SettingsIcon from "@/public/images/settings-svgrepo-com.svg";
import SingInIcon from "@/public/images/sign-in-alt-svgrepo-com.svg";
import ProfileSidebarBanner from "@/app/components/navbar/profileSidebarBanner";
import CloseIcon from "@/public/images/close-svgrepo-com.svg";
import LogoutButton from "@/app/components/navbar/LogoutButton";
import {useSession} from "next-auth/react";
import SkeletonProfileSidebarBanner from "@/app/components/Skeletons/SkeletonProfileSidebarBanner";




const ProfileDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const {data:userData,status}=useSession();
    const user=userData?.user

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const handleClose = () => {
        setIsDrawerOpen(false);
    };

    return (
        <Fragment>
            <button type="button" onClick={handleToggleDrawer}>
                <div className="flex justify-center">
                    <Image src={user?.profilePhoto||Avater}
                           height={24}
                           width={24}
                           alt='avater'
                           placeholder="blur"
                           blurDataURL={user?.profilePhoto||null}
                           className="rounded-full" />
                </div>
                <p className="text-sm text-center sm:block hidden">Profile</p>
            </button>

            <Drawer
                destination="right"
                isDrawerOpen={isDrawerOpen}
                handleClose={handleClose}
            >

                {/* Drawer content goes here */}
                <div className="flex-1 ">
                    <div className="relative">

                        {
                            status==="loading"?<SkeletonProfileSidebarBanner/>:
                                <ProfileSidebarBanner  user={user}/>
                        }


                        <button onClick={handleClose}
                            className="p-1 rounded-full absolute top-0 right-0"
                        >
                            <Image height={25} src={CloseIcon} alt="close icon" />
                        </button>
                        <ol className="pt-5">
                            {
                                profileMenu.map((menu, index) => {
                                    return (
                                        <li key={index}>
                                            <Link href={menu.path} onClick={handleClose}>
                                                <button type="button"
                                                    className="w-full  hover:text-blue-500  duration-300 text-slate-700 dark:text-slate-300  px-3 py-1 text-left  flex justify-between gap-4"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <Image src={menu.icon} alt='avater'
                                                            className="h-5 w-5 rounded-full" /> {menu.title}
                                                    </div>
                                                    <Image src={RightIcon} alt='avater' className="h-5 w-5" />
                                                </button>
                                            </Link>
                                        </li>
                                    )
                                })
                            }


                            {!user?.email ? <li>
                                <Link href="/login" onClick={handleClose}>
                                    <button type="button"
                                        className="w-full  hover:text-blue-500 duration-300 text-slate-700 dark:text-slate-300 px-3 py-1 text-left  flex justify-between gap-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Image src={SingInIcon} alt='avater' className="h-5 w-5" /> Sign In
                                        </div>
                                        <Image src={RightIcon} alt='avater' className="h-5 w-5" />
                                    </button>
                                </Link>
                            </li> :
                                <li>
                                    <LogoutButton handleClose={handleClose} />
                                </li>}
                        </ol>
                    </div>
                </div>
            </Drawer>
        </Fragment>
    );
};
export const profileMenu = [
    {
        title: "My Account",
        path: "/myAccount",
        icon: Avater
    },
    {
        title: "My Cart",
        path: "/myCart",
        icon: CartOrderIcon
    },
    {
        title: "My Orders",
        path: "/myOrders",
        icon: CartOrderIcon
    },
    {
        title: "Save For Later",
        path: "/saveForLater",
        icon: LoveIcon
    },
    {
        title: "Settings",
        icon: SettingsIcon,
        path: "/settings",
        submenu: [
            {
                title: "Password change",
                icon: CartOrderIcon,
                path: "",
            }
        ]
    },
]
export default ProfileDrawer;