import React from 'react';
import Image from "next/image";
import SingOut from "@/public/images/sign-out-svgrepo-com.svg";
import RightIcon from "@/public/images/right-chevron-svgrepo-com.svg";
import {useRouter} from "next/navigation";

const LogoutButton = ({handleClose}) => {
    const router = useRouter();
    const logout = async () => {
        // await handleLogout()
        handleClose()
        router.push('/login');
    }

    return (
        <button type="button"
                onClick={logout}
                className="w-full bg-gray-100 hover:bg-gray-200 duration-300 text-gray-500 font-bold px-3 py-3 text-left border-b-2 flex justify-between gap-4"
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