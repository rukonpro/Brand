import React from 'react';
import  GoogleIcon from "@/public/images/google-icon.png";
import  FacebookIcon from "@/public/images/facebook-icon.png";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/app/login/loginForm";
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

                        <div className="md:col-span-7 col-span-12 bg-gray-200/50 h-full px-3 sm:px-10 md:px-5 lg:px-5 py-5">
                            <h1 className="text-xl font-bold pb-5">Sign In</h1>

                                 {/*login form*/}

                            <LoginForm/>

                            <div className="pt-8">
                                <div className="grid grid-cols-12 items-center ">
                                    <div className="col-span-5 border-b-2 border-gray-300">
                                    </div>
                                    <div className="col-span-2 flex justify-center text-white ">Or</div>
                                    <div className="col-span-5 border-b-2  border-gray-300">

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


                            <div className="pt-8 text-center">
                                <p className="text-gray-600">Not have an account? <Link href="/register"
                                                                                            className="text-blue-500">Sing Up</Link>
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