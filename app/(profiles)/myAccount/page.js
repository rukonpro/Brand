"use client"
import React, {useContext, useState} from 'react';
import Image from "next/image";
import avatar from "@/public/images/avatar.png";
import CoverPhoto from "@/public/images/BannerEcommerce-Nordics.png";
import CameraIcon from "@/public/images/camera-icon.svg";
import EditIcon from "@/public/images/edit-2-svgrepo-com.svg";
import SaveIcon from "@/public/images/save-floppy-svgrepo-com.svg";
import LoadingIcon from "@/public/images/loading-gray-color-svgrepo-com.svg";
import ProfileForm from "@/app/components/ProfileForm/ProfileForm";
import {useSession} from "next-auth/react";

const MyAccount = () => {
const {data:userData}=useSession();
const user=userData?.user;
    const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
    const [selectedCoverPhoto, setSelectedCoverPhoto] = useState(null);
    const [profileImageBB, setProfileImageBB] = useState(null);
    const [coverImageBB, setCoverImageBB] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);



    const handleProfilePhotoChange = (event) => {
        setSelectedProfilePicture(URL.createObjectURL(event.target.files[0]));
        setProfileImageBB(event.target.files[0]);
        setEdit(true)
    };
    const handleCoverPhotoChange = (event) => {
        setSelectedCoverPhoto(URL.createObjectURL(event.target.files[0]));
        setCoverImageBB(event.target.files[0]);
        setEdit(true)
    };

    const handleSave = async () => {

    }


    return (
        <div>
            <h1 className="text-xl font-bold text-gray-600 pb-5 px-3 md:px-0">My Profile</h1>
            <div className="relative w-full">
                <div className=" mb-6  py-6 px-3 absolute w-full bg-blue-800/50 h-60">
                    <div>
                        <div className="flex items-center gap-4 ">
                            <div
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                className=" relative"
                            >
                                {
                                    <label htmlFor="profile-picture-input"
                                        className="text-xl absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer "
                                    >
                                        {hovered &&
                                            <div
                                                type="button" className="bg-blue-800/50  rounded-full w-16 h-16 p-3">
                                                <Image src={CameraIcon} alt="Edit icon" />
                                            </div>
                                        }
                                        <input
                                            id="profile-picture-input"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfilePhotoChange}
                                            style={{ display: 'none' }}
                                        />
                                    </label>

                                }

                                <div className="p-1 bg-white rounded-full">
                                    <Image
                                        src={selectedProfilePicture || user?.profilePhoto || avatar}
                                        alt="Profile Avatar"
                                        width={100}
                                        height={100}
                                        className="h-36 w-36 rounded-full shadow-2xl shadow-blue-600 object-fill"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">{user?.firstName} {user?.lastName}</h1>
                                <p className="text-sm sm:text-lg text-gray-100">{user?.email}</p>
                            </div>
                        </div>
                    </div>


                    <label htmlFor="cover-picture-input">
                        <div className="absolute right-10 bottom-5 bg-blue-800/50 px-2 py-1 text-gray-200 font-bold flex  gap-2 cursor-pointer">
                            <Image src={CameraIcon} height={20} alt="Edit Icon" /> Change Cover Photo
                        </div>

                        <input
                            id="cover-picture-input"
                            type="file"
                            accept="image/*"
                            onChange={handleCoverPhotoChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>


                <div className="w-full">
                    <Image
                        src={selectedCoverPhoto || user?.coverPhoto || CoverPhoto}
                        height={500}
                        width={700}
                        alt="Cover Photo"
                        className="w-full h-60 object-cover"
                    />
                </div>
            </div>


            <div className="border-t-2 mt-8">
                <div className="flex justify-between items-center px-3 py-5 md:px-0">
                    <h1 className="text-xl font-bold text-gray-600 ">Personal details</h1>
                    <button type="button"
                        onClick={handleSave}
                        className="border-2 border-[#3e8cfe] hover:bg-blue-300 hover:text-white text-gray-500 font-bold  px-3 py-1 rounded-lg flex items-center gap-2">

                        {
                            loading ? <Image src={LoadingIcon} height={24} alt="eidt icon" className="animate-spin" /> :
                                <Image src={!edit ? EditIcon : SaveIcon} height={24} alt="eidt icon" />
                        }

                        {
                            loading ? "Updating..." :
                                !edit ? "Edit now" : "Save Change"
                        }
                    </button>
                </div>

                <ProfileForm user={user}/>

            </div>
        </div>
    );
};

export default MyAccount;