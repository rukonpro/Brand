import React from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

const FileUploader = ({ formik, setPhotoUrl, photoUrl }) => {

    const handleUploadSuccess = async (result) => {
        const url = result.info.secure_url;
        setPhotoUrl(url);  // Set the URL in the parent component's state
        formik.setFieldValue('photo', url);  // Update Formik form field
    };

    const handleUpload = (open) => {
        open();  // Open the upload widget
    };

    return (
        <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Upload Photo
            </label>

            {/* Cloudinary Upload Widget */}
            <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}  // Cloudinary preset from .env
                signatureEndpoint="/api/signature/signature"  // Backend endpoint for signed uploads
                onUpload={(result) => {
                    if (result.event === 'success') {
                        handleUploadSuccess(result);  // On successful upload, call success handler
                    }
                }}
            >
                {({ open }) => (
                    <button
                        type="button"
                        onClick={() => handleUpload(open)}
                        className="mt-1 w-full py-2 px-4 border rounded-md shadow-sm text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none"
                    >
                        Upload Image
                    </button>
                )}
            </CldUploadWidget>

            {/* Conditionally render the uploaded image */}
            {photoUrl && (
                <div className="mt-4">
                    <Image src={photoUrl} width={100} height={100} alt="Uploaded image" className="rounded-lg" />
                </div>
            )}
        </div>
    );
};

export default FileUploader;
