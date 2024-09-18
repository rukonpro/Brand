"use client"
import React from 'react';
import Image from "next/image";
import Avater from "@/public/images/avatar.png";
import Link from "next/link";
import {useSession} from "next-auth/react";
import JoinNowCardSkeleton from "@/app/components/Banner/JoinNowCardSkeleton";


const JoinNowCard = () => {

    const {data,status}= useSession();

    const user=data?.user;

    return (
        <div className={`p-3  rounded-lg sm:col-span-1 col-span-2 ${user?.email ? "bg-[#3f8bf8] " : "bg-[#E3F0FF]"}`}>

            {
                status==="loading"?<JoinNowCardSkeleton/>:<>
                    {!user?.email && <div className='grid grid-cols-3 gap-2 items-center'>
                        <div className="col-span-1">
                            <Image className="rounded-full h-[44px] w-[44px] object-contain bg-white p-1"
                                   src={Avater} alt='Avater' />
                        </div>
                        <div className="col-span-2">
                    <span>{
                        "Hi, user let’s get stated"
                    }</span>
                        </div>
                    </div>}

                    {user?.email &&
                        <div className='grid grid-cols-3 gap-1 items-center'>
                            <div className="col-span-1">
                                <Link href="/myAccount">
                                    <Image className="rounded-full h-[44px] w-[44px] object-contain bg-white p-1"
                                           src={user?.profilePhoto||Avater} alt='Avater' height={50} width={50} />
                                </Link>
                            </div>
                            <div className="col-span-2">
                                <span className="text-white font-bold">{user?.firstName} welcome to the brand </span>
                            </div>
                        </div>
                    }
                    {!user?.email &&
                        <div><Link href="/register">
                            <button
                                className="rounded-lg bg-blue-500 text-white py-1 px-2 mt-2 inline-block w-full">
                                Join now
                            </button>
                        </Link>
                            <Link href="/login">
                                <button className="rounded-lg bg-white py-1 px-2 mt-2 inline-block w-full">
                                    Login
                                </button>
                            </Link>
                        </div>}
                </>
            }
        </div>
    );
};

export default JoinNowCard;