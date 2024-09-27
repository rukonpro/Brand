import { useFormik } from 'formik';
import { CldUploadWidget } from 'next-cloudinary';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import Image from "next/image";
import {createBanner} from "@/app/utils/banner/fetch_banners_api";
import toast from "react-hot-toast";

const BannerFormWithCloudinarySignature = () => {
    const [imageUrl, setImageUrl] = useState('');
    const formik = useFormik({
        initialValues: {
            title: '',
            image: '',
            link: '',
            startDate: '',
            endDate: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().trim().required('Title is required').min(2, 'Title must be at least 2 characters'),
            image: Yup.string().required('Image URL is required'),
            link: Yup.string().required("Path is required"),
            startDate: Yup.date().required('Start date is required'),
            endDate: Yup.date().required('End date is required')
        }),
        onSubmit:async (values, { setSubmitting,resetForm }) => {
            setSubmitting(true);
           const res=await createBanner(values);
           if (res?.status===201){
               toast.success("Banner create is successfully",{
                   id:"banner"
               });
               resetForm();
               setImageUrl('');
           }else {
               toast.error("Internal error , please try again",{
                   id:"banner"
               })
           }
            setTimeout(() => setSubmitting(false), 2000);
        }
    });

    // Function to get the Cloudinary signature from your API
    const getSignature = async () => {
        const timestamp = Math.round(new Date().getTime() / 1000); // Generate a timestamp for signing
        const paramsToSign = { timestamp };
        const { data } = await axios.post('/api/signature/signature', { paramsToSign });
        return { signature: data.signature, timestamp };
    };

    const handleUpload = async (open) => {
        const { signature, timestamp } = await getSignature();
        open({ signature, timestamp });
    };

    const handleUploadSuccess = (result) => {
        const uploadedImageUrl = result.info.secure_url;
        setImageUrl(uploadedImageUrl);
        formik.setFieldValue('image', uploadedImageUrl); // Update Formik field
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
            <form onSubmit={formik.handleSubmit} className="mt-11">

                {/* Title Field */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Banner Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className={`mt-1 block w-full px-3 py-2 border ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <p className="text-red-500 text-sm">{formik.errors.title}</p>
                    )}
                </div>

                {/* Cloudinary Upload Widget for Banner Image */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Banner Image</label>
                    <CldUploadWidget
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                        signatureEndpoint="/api/signature/signature"
                        onUpload={(result) => {
                            if (result && result.event === 'success') {
                                handleUploadSuccess(result);
                            }
                        }}
                    >
                        {({ open }) => (
                            <button
                                type="button"
                                onClick={() => handleUpload(open)}
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-indigo-600 hover:bg-indigo-50"
                            >
                                Upload Image
                            </button>
                        )}
                    </CldUploadWidget>

                    {/* Show the uploaded image */}
                    {imageUrl && (
                        <div className="mt-2">
                            <Image src={imageUrl} height={80} width={80} alt="Uploaded banner image" className="h-20" />
                        </div>
                    )}

                    {/* Formik field to store the image URL */}
                    <input
                        type="hidden"
                        id="image"
                        name="image"
                        value={formik.values.image}
                    />
                    {formik.touched.image && formik.errors.image && (
                        <p className="text-red-500 text-sm">{formik.errors.image}</p>
                    )}
                </div>

                {/* Link Field */}
                <div className="mb-4">
                    <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
                    <input
                        type="text"
                        id="link"
                        name="link"
                        className={`mt-1 block w-full px-3 py-2 border ${formik.touched.link && formik.errors.link ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.link}
                    />
                    {formik.touched.link && formik.errors.link && (
                        <p className="text-red-500 text-sm">{formik.errors.link}</p>
                    )}
                </div>

                {/* Start Date Field */}
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className={`mt-1 block w-full px-3 py-2 border ${formik.touched.startDate && formik.errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.startDate}
                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                        <p className="text-red-500 text-sm">{formik.errors.startDate}</p>
                    )}
                </div>

                {/* End Date Field */}
                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className={`mt-1 block w-full px-3 py-2 border ${formik.touched.endDate && formik.errors.endDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.endDate}
                    />
                    {formik.touched.endDate && formik.errors.endDate && (
                        <p className="text-red-500 text-sm">{formik.errors.endDate}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-indigo-600 text-white font-bold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Submitting...' : 'Create Banner'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BannerFormWithCloudinarySignature;
