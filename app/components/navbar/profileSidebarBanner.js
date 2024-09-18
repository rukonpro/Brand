import React from 'react';
import Image from "next/image";
import avatar from "@/public/images/avatar.png";
import CoverPhoto from "@/public/images/BannerEcommerce-Nordics.png";


const ProfileSidebarBanner = ({ user }) => {
    return (
        <div className="relative w-full">
            <div className=" mb-6  py-7 px-3 absolute w-full bg-blue-800/50"
            >
                <div>
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-xl font-bold text-white">My Profile</h2>
                    </div>

                    <div className="flex items-center gap-4 ">
                        <Image
                            src={user?.profilePhoto || avatar}
                            width={300}
                            height={300}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={user?.profilePhoto}
                            alt="Prfile photo"
                            className="h-16 w-16 rounded-full border-2 border-blue-500 bg-white p-1"
                        />

                        <div>
                            <h1 className="text-xl font-bold text-white">{user?.firstName} {user?.lastName}</h1>
                            <p className="text-sm text-gray-100">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full ">
                <Image
                    src={user?.coverPhoto || CoverPhoto}
                    width={400}
                    height={400}
                    loading="lazy"

                    alt="Cover Photo"
                    className="w-full h-36 object-fill"
                />
            </div>
        </div>
    );
};

export default ProfileSidebarBanner;