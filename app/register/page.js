import React from 'react';
import Link from "next/link";
import RegisterForm from "@/app/register/registerForm";
import GoogleAndFacebookLogin from "@/app/login/GoogleAndFacebookLogin";
import Navbar from "@/app/components/navbar/navbar";


export const metadata = {
    title: "Register - Brand",
    description: "Create an account on Brand to enjoy personalized shopping experiences. Sign up now to access exclusive deals, track your orders, and save your favorite products.",
    keywords: "register, sign up, create account, Brand, online shopping, exclusive deals",
    openGraph: {
        title: "Register - Brand",
        description: "Create an account on Brand to enjoy personalized shopping experiences. Sign up now to access exclusive deals, track your orders, and save your favorite products.",
        url: "https://brand-rukon.vercel.app/register", // Adjust the URL if necessary
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Register - Brand",
        description: "Create an account on Brand to enjoy personalized shopping experiences. Sign up now to access exclusive deals, track your orders, and save your favorite products.",
    },
};


const Register = () => {
    return (

        <>
            <div className="sticky top-0 z-[20]">
                <Navbar/>
            </div>
            <div className="flex-1 inset-0 ">
                <div className='max-w-[1200px] mx-auto py-5 lg:py-36 px-3'>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="md:col-span-5 col-span-12">
                            <h1 className="text-2xl font-bold dark:text-slate-100 text-slate-700 py-5">Welcome to
                                Brand!</h1>

                            <p className="text-lg dark:text-slate-100 text-slate-600">Registering with Brand allows you
                                to enjoy a seamless
                                shopping experience, exclusive offers, and personalized recommendations. Signing up is
                                quick and easy!.</p>
                        </div>

                        <div
                            className="md:col-span-7 col-span-12  backdrop-blur-3xl bg-gray-200/10 h-full px-3 sm:px-10 md:px-5 lg:px-5 py-5 rounded-lg drop-shadow-lg dark:bg-gray-700/10">
                            <h1 className="text-xl font-bold pb-5">Sign Up</h1>

                            {/*Register form*/}
                            <RegisterForm/>


                            <GoogleAndFacebookLogin/>

                            <div className="pt-8 text-center">
                                <p className="text-gray-600 dark:text-slate-300">Already have an account? <Link
                                    href="/login"
                                    className="text-blue-500">Login</Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default Register;