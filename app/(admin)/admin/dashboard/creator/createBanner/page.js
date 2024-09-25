// pages/index.js or wherever your form is located
"use client";

import React, { useState } from 'react';
import BackButton from "@/app/components/BackButtons/BackButton";
import { uploadImages } from "@/app/utils/imageUploader/imageUploader";

const CreateBanner = () => {
    const [files, setFiles] = useState([]); // Initialize files as an array
    const [message, setMessage] = useState('');
    const [uploadedUrls, setUploadedUrls] = useState([]); // Store the URLs of uploaded images

    const handleFileChange = (e) => {
        setFiles(e.target.files); // Store multiple selected files
    };

    const handleUpload = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const res = await uploadImages(files); // Pass array of files for upload

        if (res.photos) {
            setUploadedUrls(res.photos); // Save uploaded photo URLs
            setMessage('Files uploaded successfully');
        } else {
            setMessage(res.message || 'Error during upload');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-lg">Create a banner</h1>
                <BackButton title="Back" />
            </div>

            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} multiple required /> {/* Allow multiple files */}
                <button type="submit">Upload</button>
                {message && <p>{message}</p>}
            </form>

            {/* Display uploaded images */}
            <div className="mt-4">
                {uploadedUrls.length > 0 && (
                    <div>
                        <h2>Uploaded Images:</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {uploadedUrls.map((url, index) => (
                                <img key={index} src={url} alt={`Uploaded file ${index + 1}`} className="w-full" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateBanner;
