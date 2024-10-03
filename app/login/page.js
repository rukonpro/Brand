import React from 'react';
import  GoogleIcon from "@/public/images/google-icon.png";
import  FacebookIcon from "@/public/images/facebook-icon.png";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/app/login/loginForm";
import GoogleAndFacebookLogin from "@/app/login/GoogleAndFacebookLogin";


export const metadata = {
    title: "Login - Brand",
    description: "Access your Brand account to enjoy personalized shopping. Log in to manage your orders, view saved items, and update your account information.",
    keywords: "login, user login, Brand, account access, online shopping",
    openGraph: {
        title: "Login - Brand",
        description: "Access your Brand account to enjoy personalized shopping. Log in to manage your orders, view saved items, and update your account information.",
        url: "https://brand-rukon.vercel.app/login", // Adjust the URL if necessary
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Login - Brand",
        description: "Access your Brand account to enjoy personalized shopping. Log in to manage your orders, view saved items, and update your account information.",
    },
};


const Login = () => {

    return (
        <div>
            <div className=" flex-1 md:rounded-lg">
                <div className='max-w-[1200px] mx-auto py-5 lg:py-36 px-3'>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="md:col-span-5 col-span-12">
                            <h1 className="text-2xl font-bold dark:text-slate-100 text-slate-700 py-5">Welcome to Brand!</h1>

                            <p className="text-lg text-slate-600 dark:text-slate-300 ">Registering with Brand allows you to enjoy a seamless
                                shopping experience, exclusive offers, and personalized recommendations. Signing up is
                                quick and easy!.</p>
                        </div>

                        <div className="md:col-span-7 col-span-12 backdrop-blur-3xl bg-gray-200/10 h-full px-3 sm:px-10 md:px-5 lg:px-5 py-5 rounded-lg drop-shadow-lg dark:bg-gray-700/10">
                            <h1 className="text-xl font-bold pb-5">Sign In</h1>

                                 {/*login form*/}

                            <LoginForm/>

                            <GoogleAndFacebookLogin/>


                            <div className="pt-8 text-center">
                                <p className="text-gray-600 dark:text-slate-300">Not have an account?
                                    <Link href="/register" className="text-blue-500"> Sing Up</Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;