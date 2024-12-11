import React from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { RiImageAddFill } from 'react-icons/ri';
import baseURL from '@/app/utils/baseURL';


const ImageUploadWidget = ({setImages }) => {

    return (

        <>
            <CldUploadWidget
                signatureEndpoint={`${baseURL}/api/signature/signature`}
                onUpload={(result, { widget }) => {
                    setImages((prevResources) => [...prevResources, result?.info?.secure_url]);
                }}
            >
                {({ open }) => {
                    function handleOnClick() {
                        open(); // Open the upload widget
                    }
                    return (
                        <button
                        type='button'
                        onClick={handleOnClick} className="px-5 flex items-center justify-center gap-2 rounded-full border-2 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300">
                            <RiImageAddFill />
                            Upload
                        </button>
                    );
                }}
            </CldUploadWidget>
        </>
    );
};

export default ImageUploadWidget;
