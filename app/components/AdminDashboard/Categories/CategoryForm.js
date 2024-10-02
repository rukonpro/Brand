import React from 'react';
import {CldUploadWidget} from "next-cloudinary";
import {BiSolidImageAdd} from "react-icons/bi";
import Image from "next/image";

const CategoryForm = ({handleUpload,handleUploadSuccess,handleDeleteCategory,deleteLoading,imageUrl,formik}) => {
    return (
        <form onSubmit={formik.handleSubmit}>

            {/* Category Name Field */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category
                    Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Inter category name"
                    className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}
            </div>

            {/* Cloudinary Upload Widget for Category Photo */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 ">Upload Category
                    Photo</label>
                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    signatureEndpoint="/api/signature/signature"
                    onUpload={(result) => {
                        if (result && result.event === 'success') {
                            handleUploadSuccess(result);
                        }
                    }}
                >
                    {({open}) => (
                        <button
                            type="button"
                            onClick={() => handleUpload(open)}
                            className="mt-1 w-full px-4 py-2 flex justify-center items-center gap-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-blue-500 hover:bg-blue-50 dark:bg-slate-700 dark:text-slate-300"
                        >
                            <BiSolidImageAdd className="size-6"/> Upload Photo
                        </button>
                    )}
                </CldUploadWidget>

                {/* Show the uploaded image */}
                {imageUrl && (
                    <div className="mt-2">
                        <Image src={imageUrl} height={80} width={80} alt="Uploaded category photo" className="h-20"/>
                    </div>
                )}

                {/* Formik field to store the image URL */}
                <input
                    type="hidden"
                    id="photo"
                    name="photo"
                    value={formik.values.photo}
                />
                {formik.touched.photo && formik.errors.photo && (
                    <p className="text-red-500 text-sm">{formik.errors.photo}</p>
                )}
            </div>

            {/* Parent ID Field */}
            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="parentId" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Parent
                        ID</label>
                    <button type="button" onClick={() => setCategoryId("")}
                            className="bg-slate-200 px-2 rounded-full dark:bg-slate-700"
                    >Clear ID
                    </button>
                </div>
                <input
                    type="text"
                    id="parentId"
                    name="parentId"
                    disabled
                    placeholder="Select parent Id"
                    className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-300 ${formik.touched.parentId && formik.errors.parentId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.parentId}
                />
                {formik.touched.parentId && formik.errors.parentId && (
                    <p className="text-red-500 text-sm">{formik.errors.parentId}</p>
                )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? 'Submitting...' : 'Create Category'}
                </button>


                <button
                    onClick={handleDeleteCategory}
                    type="button"
                    disabled={deleteLoading}
                    className="w-full px-4 mt-3 py-2 bg-red-500 text-white font-bold rounded-md shadow-sm  hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-300"
                >
                    {
                        deleteLoading ? <span>
                               Deleting...
                            </span> : "Delete Category"
                    }
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;