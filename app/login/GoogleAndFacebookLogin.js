import React from 'react';
import Image from "next/image";
import GoogleIcon from "@/public/images/google-icon.png";
import FacebookIcon from "@/public/images/facebook-icon.png";

const GoogleAndFacebookLogin = () => {
    return (
        <div>
            <div className="pt-8">
                <div className="grid grid-cols-12 items-center ">
                    <div className="col-span-5 border-b-2 border-gray-300 dark:border-slate-500">
                    </div>
                    <div className="col-span-2 flex justify-center text-white ">Or</div>
                    <div className="col-span-5 border-b-2  border-gray-300 dark:border-slate-500">

                    </div>

                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 pt-8">
                <button type="button"
                        className="px-3 py-2 rounded-lg w-full my-1 bg-white text-gray-600 border-2 flex justify-center items-center gap-4"
                >
                    <Image src={GoogleIcon} alt="google icon"/>
                    Google
                </button>


                <button type="button"
                        className="px-3 py-2 rounded-lg w-full my-1 bg-white text-gray-600 border-2 flex justify-center items-center gap-4"
                >
                    <Image src={FacebookIcon} alt="google icon"/>
                    Facebook
                </button>
            </div>
        </div>
    );
};

export default GoogleAndFacebookLogin;