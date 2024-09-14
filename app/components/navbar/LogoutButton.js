import React from 'react';
import Image from "next/image";
import SingOut from "@/public/images/sign-out-svgrepo-com.svg";
import RightIcon from "@/public/images/right-chevron-svgrepo-com.svg";
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
import Cookies from "js-cookie";

const LogoutButton = ({handleClose}) => {
    const router = useRouter();
    const logout = async () => {
        // await handleLogout()

        await  Cookies.remove('next-auth.session-token');
        await   Cookies.remove('next-auth.csrf-token');
        await  signOut({ callbackUrl: '/login' })
        handleClose()
        router.push('/login');
    }

    return (
        <button type="button"
                onClick={logout}
                className="w-full  hover:text-blue-500 duration-300 text-slate-700  px-3 py-1 text-left  flex justify-between gap-4"
        >
            <div className="flex items-center gap-4">
                <Image src={SingOut} alt='avater' className="h-5 w-5"/>
                Sign Out
            </div>
            <Image src={RightIcon} alt='avater' className="h-5 w-5"/>
        </button>
    );
};

export default LogoutButton;