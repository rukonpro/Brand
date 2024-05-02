import React from 'react';
import  GoogleIcon from "@/public/images/google-icon.png";
import  FacebookIcon from "@/public/images/facebook-icon.png";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/Footer/Footer";

const Register = () => {
    return (
        <div>
            <div className="registerbg flex-1 inset-0 ">
                <div className='max-w-[1200px] mx-auto py-5 lg:py-36 px-3'>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-white py-5">Welcome to Brand!</h1>

                            <p className="text-lg text-white/70">Registering with Brand allows you to enjoy a seamless
                                shopping experience, exclusive offers, and personalized recommendations. Signing up is
                                quick and easy!.</p>
                        </div>

                        <div className="bg-gray-200/50 h-full px-5 md:px-10 lg:px-16 py-5">
                            <h1 className="text-xl font-bold pb-5">Sign Up</h1>

                            <input type="email" placeholder="your email address"
                                   className="px-3 py-2 rounded-lg w-full my-1 bg-white/50 border-2"
                            />
                            <br/>
                            <input type="password" placeholder="New password with 6 digit"
                                   className="px-3 py-2 rounded-lg w-full my-1 bg-white/50 border-2"
                            />
                            <br/>
                            <input type="password" placeholder="Re-password"
                                   className="px-3 py-2 rounded-lg w-full my-1 bg-white/50 border-2"
                            />
                            <br/>
                            <button type="submit"
                                    className="px-3 py-2 rounded-lg w-full my-1 bg-blue-500 text-white  mt-4"
                            >Sign Up
                            </button>

                            <div className="pt-8">
                                <div className="grid grid-cols-12 items-center ">
                                    <div className="col-span-5 border-b-2 border-gray-300">
                                    </div>
                                    <div className="col-span-2 flex justify-center text-gray-400 ">Or</div>
                                    <div className="col-span-5 border-b-2  border-gray-300">

                                    </div>

                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-8">
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
                                <p className="text-gray-600">Already have an account? <Link href="/profiles/login"
                                                                                            className="text-blue-500">Login</Link>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;