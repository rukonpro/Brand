"use client"
import React, {Fragment, useEffect, useState} from 'react';
import Drawer from "@/app/components/Drawer/Drawer";
import Image from "next/image";
import Avater from "@/public/images/avatar.png";
import  CloseIcon from "@/public/images/close-svgrepo-com.svg";
import  CoverPhoto from "@/public/images/cloth-image-1.jpg";
import profilePhoto from "@/public/images/profile-photo-1.webp";
import CartOrderIcon from "@/public/images/cart-check-svgrepo-com.svg";
import RightIcon from "@/public/images/right-chevron-svgrepo-com.svg";
import LoveIcon from "@/public/images/love.png";
import SettingsIcon from "@/public/images/settings-svgrepo-com.svg";
import SingInIcon from "@/public/images/sign-in-alt-svgrepo-com.svg";
import SingOut from "@/public/images/sign-out-svgrepo-com.svg";
import {useRouter} from "next/navigation";
import Link from "next/link";
import axios from "axios";

const ProfileDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [user,setUser]=useState({});
    const router = useRouter()


    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const handleClose = () => {
        setIsDrawerOpen(false);
    };


    const handleLogout= async ()=>{
        try {
            await axios.get('/api/users/signout');
            alert("Logout successfully");
            handleClose()
            router.push('/login');

        } catch (error) {
            alert(error.message);
            console.log(error.message);
        }
    }

const getUser=async ()=>{
  try {
      const user= await axios.get("/api/users/me");
      setUser(user?.data?.data)
  }catch (error){
      console.log(error.message)
  }
}
    useEffect(() => {
        getUser()
    }, []);
    return (
        <Fragment>
            <button type="button" onClick={handleToggleDrawer}>
                <div className="flex justify-center">
                    <Image src={Avater} alt='avater'/>
                </div>
                <p className="text-sm text-center sm:block hidden">Profile</p>
            </button>

            <Drawer
                destination="right"
                isDrawerOpen={isDrawerOpen}
                handleClose={handleClose}
            >

                {/* Drawer content goes here */}
                <div className="flex-1">

                        <div>
                            <div className="relative w-full">
                                <div className=" mb-6  py-6 px-3 absolute w-full bg-blue-800/50"
                                >
                                    <div>
                                        <div className="flex items-center justify-between w-full">
                                            <h2 className="text-xl font-bold text-white">My Profile</h2>
                                            <button onClick={handleClose}
                                                    className="p-1 rounded-full"
                                            >
                                                <Image height={25} src={CloseIcon} alt="close icon"/>
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Image src={profilePhoto} alt="Prfile photo"
                                                   className="h-16 w-16 rounded-full border-2 border-white"
                                            />

                                            <div>
                                                <h1 className="text-xl font-bold text-white">{user?.name}</h1>
                                                <p className="text-sm text-gray-100">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <Image
                                        src={CoverPhoto}
                                        alt="Cover Photo"
                                        className="w-full h-36 object-fill"
                                    />
                                </div>
                            </div>
                            <ol>
                                {
                                    profileMenu.map((menu, index) => {
                                        return (
                                            <li key={index}>
                                                <Link href={menu.path} onClick={handleClose}>
                                                    <button type="button"
                                                            className="w-full bg-gray-100 hover:bg-gray-200 duration-300 text-gray-500 font-bold px-3 py-3 text-left border-b-2 flex justify-between gap-4"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <Image src={menu.icon} alt='avater'
                                                                   className="h-5 w-5"/> {menu.title}
                                                        </div>
                                                        <Image src={RightIcon} alt='avater' className="h-5 w-5"/>
                                                    </button>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }

                                {!user?.email?<li>
                                        <Link href="/login" onClick={handleClose}>
                                            <button type="button"
                                                    className="w-full bg-gray-100 hover:bg-gray-200 duration-300 text-gray-500 font-bold px-3 py-3 text-left border-b-2 flex justify-between gap-4"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Image src={SingInIcon} alt='avater' className="h-5 w-5"/> Sign In
                                                </div>
                                                <Image src={RightIcon} alt='avater' className="h-5 w-5"/>
                                            </button>
                                        </Link>
                                    </li>:
                                    <li>
                                        <button type="button"
                                                onClick={handleLogout}
                                                className="w-full bg-gray-100 hover:bg-gray-200 duration-300 text-gray-500 font-bold px-3 py-3 text-left border-b-2 flex justify-between gap-4"
                                        >
                                            <div className="flex items-center gap-4">
                                                <Image src={SingOut} alt='avater' className="h-5 w-5"/>
                                                Sign Out
                                            </div>
                    <Image src={RightIcon} alt='avater' className="h-5 w-5"/>
                </button>
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
        path: "/profiles/myAccount",
        icon: Avater
    },
    {
        title: "My Orders",
        path: "/profiles/myOrders",
        icon: CartOrderIcon
    },
    {
        title: "Save For Later",
        path: "/profiles/saveForLater",
        icon: LoveIcon
    },
    {
        title: "Settings",
        icon: SettingsIcon,
        path: "",
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