"use client"
import React, { useState } from 'react';
import Image from "next/image";
import profilePhoto from "@/public/images/profile-photo-1.webp";
import CoverPhoto from "@/public/images/cloth-image-1.jpg";
import CameraIcon from "@/public/images/camera-icon.svg";
import EditIcon from "@/public/images/edit-2-svgrepo-com.svg";
import SaveIcon from "@/public/images/save-floppy-svgrepo-com.svg";
import LoadingIcon from "@/public/images/loading-gray-color-svgrepo-com.svg";
import uploadImage from "@/lib/imageUploader/imageUploader";
import { updateUser } from '@/lib/user/user';
import useUser from '@/lib/user/useUser';
import toast from 'react-hot-toast';
const MyAccount = () => {

    const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
    const [selectedCoverPhoto, setSelectedCoverPhoto] = useState(null);
    const [profileImageBB, setProfileImageBB] = useState(null);
    const [coverImageBB, setCoverImageBB] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);


    const { user} = useUser();

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

        try {
            setLoading(true);

            if (profileImageBB || coverImageBB) {

                let profileUrl = undefined;
                let coverUrl = undefined;

                if (profileImageBB) {
                    profileUrl = await uploadImage(profileImageBB);
                    const user = { profilePhoto: profileUrl.data.data?.url };
                    await updateUser(user);
                }
                if (coverImageBB) {
                    coverUrl = await uploadImage(coverImageBB);
                    const user = { coverPhoto: coverUrl.data.data?.url };
                    await updateUser(user);


                }
            }
        } catch (error) {

        } finally {
            setProfileImageBB(null)
            setSelectedProfilePicture(null)
            setCoverImageBB(null)
            setCoverImageBB(null)
            setLoading(false);
        }
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
                                <h1 className="text-2xl sm:text-3xl font-bold text-white">{user?.name}</h1>
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
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-600 py-5 px-3 md:px-0">Personal details</h1>
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

                <div className="grid sm:grid-cols-4 md:grid-cols-4 gap-4  px-3 md:px-0">
                    <div className="col-span-2">
                        <label htmlFor="first_name" className="text-lg">First Name:</label>
                        <br />
                        <input type="text" id="first_name" name="first_name" placeholder="First Name"
                            className="px-3 py-2 rounded-lg mt-1  w-full" />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="last_name" className="text-lg">Last Name:</label>
                        <br />
                        <input type="text" id="last_name" name="last_name" placeholder="Last Name"
                            className="px-3 py-2 rounded-lg mt-1  w-full" />
                    </div>
                    <div>
                        <label htmlFor="gender" className="text-lg">Gender:</label>
                        <br />
                        <select id="gender" name="gender"
                            className="px-3 py-2 rounded-lg mt-1 w-full bg-white">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="date_of_birth" className="text-lg">Date of birth:</label>
                        <br />
                        <input type="date" id="date_of_birth" name="date_of_birth"
                            className="px-3 py-2 rounded-lg mt-1  w-full" />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="phone_number" className="text-lg">Phone Number:</label>
                        <br />
                        <input type="text" id="phone_number" name="phone_number"
                            placeholder="Phone Number"
                            className="px-3 py-2 rounded-lg mt-1  w-full" />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="Country" className="text-lg">Country:</label>
                        <br />
                        <input type="text" id="Country" name="Country"
                            placeholder="Country"
                            className="px-3 py-2 rounded-lg mt-1  w-full" />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="house_or_office_number" className="text-lg">House/Office number:</label>
                        <br />
                        <input type="text" id="house_or_office_number" name="house_or_office_number"
                            placeholder="House/Office number"
                            className="px-3 py-2 rounded-lg mt-1  w-full" />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="street_name" className="text-lg">Street name:</label>
                        <br />
                        <input type="text" id="street_name" name="street_name"
                            placeholder="Street name"
                            className="px-3 py-2 rounded-lg mt-1  w-full" />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="city" className="text-lg">City:</label>
                        <br />
                        <input type="text" id="city" name="city"
                            placeholder="City"
                            className="px-3 py-2 rounded-lg mt-1  w-full" />
                    </div>

                    <div>
                        <label htmlFor="postal_code" className="text-lg">Postal code:</label>
                        <br />
                        <input type="number" id="postal_code" name="postal_code"
                            placeholder="Postal code"
                            className="px-3 py-2 rounded-lg mt-1  w-full" />
                    </div>


                    <div>
                        <label htmlFor="state_province" className="text-lg">State/Province:</label>
                        <br />
                        <input type="text" id="state_province" name="state_province"
                            placeholder="State/Province"
                            className="px-3 py-2 rounded-lg mt-1  w-full" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyAccount;