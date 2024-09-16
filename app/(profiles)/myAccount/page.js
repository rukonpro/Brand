"use client"
import React, {useContext, useState} from 'react';
import Image from "next/image";
import profilePhoto from "@/public/images/profile-photo-1.webp";
import CoverPhoto from "@/public/images/cloth-image-1.jpg";
import CameraIcon from "@/public/images/camera-icon.svg";
import EditIcon from "@/public/images/edit-2-svgrepo-com.svg";
import SaveIcon from "@/public/images/save-floppy-svgrepo-com.svg";
import LoadingIcon from "@/public/images/loading-gray-color-svgrepo-com.svg";
import {AppContext} from "@/app/context/BrandContext";
import ProfileForm from "@/app/components/ProfileForm/ProfileForm";

const MyAccount = () => {
const {user}=useContext(AppContext)
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

                                <Image
                                    src={selectedProfilePicture || user?.profilePhoto || profilePhoto}
                                    alt="Profile Avatar"
                                    width={100}
                                    height={100}
                                    className="h-36 w-36 rounded-full shadow-2xl shadow-blue-600 object-fill"
                                />
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
                        height={100}
                        width={100}
                        alt="Cover Photo"
                        className="w-full h-60 object-cover"
                    />
                </div>
            </div>


            <div className="border-t-2 mt-8">
                <div className="flex justify-between items-center py-5 px-3">
                    <h1 className="text-xl font-bold text-gray-600   md:px-0">Personal details</h1>
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