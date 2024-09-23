import React from 'react';
import  GoogleIcon from "@/public/images/google-icon.png";
import  FacebookIcon from "@/public/images/facebook-icon.png";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/app/login/loginForm";
import GoogleAndFacebookLogin from "@/app/login/GoogleAndFacebookLogin";
const Login = () => {

    return (
        <div>
            <div className="loginBg flex-1 md:rounded-lg">
                <div className='max-w-[1200px] mx-auto py-5 lg:py-36 px-3'>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="md:col-span-5 col-span-12">
                            <h1 className="text-2xl font-bold text-white py-5">Welcome to Brand!</h1>

                            <p className="text-lg text-white/70">Registering with Brand allows you to enjoy a seamless
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