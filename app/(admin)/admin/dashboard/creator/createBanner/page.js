"use client";

import React, { useState } from 'react';
import BackButton from "@/app/components/BackButtons/BackButton";
import { CldUploadWidget } from 'next-cloudinary';
import baseURL from "@/app/utils/baseURL";

const CreateBanner = () => {
    // Change state to an array to store multiple images
    const [resources, setResources] = useState([]);

const photos=resources?.map(resource=>resource.secure_url);


console.log(photos);
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-lg">Create a banner</h1>
                <BackButton title="Back" />
            </div>

            {/* Cloudinary Upload Widget */}
            <CldUploadWidget
                signatureEndpoint={`${baseURL}/api/uploader/uploader`}
                onSuccess={(result, { widget }) => {
                    // Append new uploaded image info to the state array
                    setResources((prevResources) => [...prevResources, result?.info]);
                }}
                onQueuesEnd={(result, { widget }) => {
                    widget.close();
                }}
            >
                {({ open }) => {
                    function handleOnClick() {
                        open(); // Open the upload widget
                    }
                    return (
                        <button onClick={handleOnClick}>
                            Upload Image(s)
                        </button>
                    );
                }}
            </CldUploadWidget>

            {/* Display uploaded images */}
            <div className="uploaded-images mt-4">
                {resources.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                        {resources.map((resource, index) => (
                            <div key={index} className="image-preview">
                                <img
                                    src={resource.secure_url}
                                    alt={`Uploaded ${index + 1}`}
                                    className="w-full h-auto"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No images uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default CreateBanner;
