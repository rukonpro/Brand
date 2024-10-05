import { useFormik } from 'formik';
import { CldUploadWidget } from 'next-cloudinary';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import Image from "next/image";
import {createBrand} from "@/app/utils/brand/fetch_brand_api";
import toast from "react-hot-toast";

const BandFormWithCloudinarySignature = () => {
    const [imageUrl, setImageUrl] = useState('');
    const formik = useFormik({
        initialValues: {
            name: '',
            logo: '',
            website: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().trim().required('Name is required').min(2, 'Name must be at least 2 characters'),
            logo: Yup.string().required('Logo URL is required'),
            website: Yup.string().url('Invalid website URL')
        }),
        onSubmit:async (values, { setSubmitting,resetForm }) => {
            setSubmitting(true);
            const res =await createBrand(values);
            if (res?.status === 201) {
                toast.success("Band create is successfully",{
                    id:"brand"
                });
                resetForm();
                setImageUrl("")
            }else {
                toast.error("Internal error , please try again",{
                    id:"brand"
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
        formik.setFieldValue('logo', uploadedImageUrl); // Update Formik field
    };

    return (
        <div className="max-w-xl  mx-auto p-4 ">
            <form onSubmit={formik.handleSubmit}>

                {/* Name Field */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Band Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Inter name"
                        className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-red-500 text-sm">{formik.errors.name}</p>
                    )}
                </div>

                {/* Cloudinary Upload Widget for Logo */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Upload Logo</label>
                    <CldUploadWidget
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                        signatureEndpoint="/api/signature/signature"
                        onUpload={(result,widget) => {
                            console.log(result)
                            if (result && result.event === 'success') {
                                handleUploadSuccess(result);
                            }
                        }}
                    >
                        {({ open }) => (
                            <button
                                type="button"
                                onClick={() => handleUpload(open)}
                                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:bg-slate-700 dark:text-slate-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-indigo-600 hover:bg-indigo-50"
                            >
                                Upload Logo
                            </button>
                        )}
                    </CldUploadWidget>

                    {/* Show the uploaded image */}
                    {imageUrl && (
                        <div className="mt-2">
                            <Image src={imageUrl} height={80} width={80} alt="Uploaded logo" className="h-20" />
                        </div>
                    )}

                    {/* Formik field to store the image URL */}
                    <input
                        type="hidden"
                        id="logo"
                        name="logo"
                        value={formik.values.logo}
                    />
                    {formik.touched.logo && formik.errors.logo && (
                        <p className="text-red-500 text-sm">{formik.errors.logo}</p>
                    )}
                </div>

                {/* Website URL Field */}
                <div className="mb-4">
                    <label htmlFor="website" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Website URL</label>
                    <input
                        type="text"
                        id="website"
                        name="website"
                        placeholder="Inter link"
                        className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 ${formik.touched.website && formik.errors.website ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.website}
                    />
                    {formik.touched.website && formik.errors.website && (
                        <p className="text-red-500 text-sm">{formik.errors.website}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Submitting...' : 'Create Band'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BandFormWithCloudinarySignature;
