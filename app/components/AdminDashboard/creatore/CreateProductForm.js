"use client";
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createProduct } from "@/app/utils/product/fetch_products_api";
import baseURL from "@/app/utils/baseURL";
import { CldUploadWidget } from "next-cloudinary";
import { RiImageAddFill } from "react-icons/ri";

import Image from "next/image";
import toast from "react-hot-toast";
import SearchableSelectCategory from '../Products/SearchableSelectCategory';
import SearchableSelect from '../Products/SearchableSelect';

const CreateProductForm = ({ categories, brands, mutate }) => {

    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const photos = resources?.map(resource => resource?.secure_url);


    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            quantity: '',
            categoryId: '',
            brandId: '',
            taxPercentage: 0, // Default value
            deliveryFee: 0, // Default value
            dimension: {},
            material: '', // Add material
            warranty: '', // Add warranty
            protection: '', // Add protection
            availability: 'IN_STOCK', // Add availability
            status: 'ACTIVE', // Add status
            tags: [], // Dynamic tags array
            colors: [],
            sizes: [],
            photos:[]

        },
        validationSchema: Yup.object({
            name: Yup.string().required('Product name is required'),
            price: Yup.number().required('Product price is required'),
            description: Yup.string().required('Description is required'),
            quantity: Yup.number().required('Product quantity is Required'),
            categoryId: Yup.string().nullable(),
            brandId: Yup.string().nullable(),

            material: Yup.string().nullable(), // Validate material
            warranty: Yup.string().nullable(), // Validate warranty
            protection: Yup.string().nullable(), // Validate protection
            taxPercentage: Yup.number().min(0).nullable(), // Validate tax
            deliveryFee: Yup.number().min(0).nullable(), // Validate delivery fee
            colors: Yup.array()
                .of(Yup.string().max(30, 'Color name too long'))
                .optional().nullable(),

            sizes: Yup.array()
                .of(Yup.string().max(10, 'Size name too long'))
                .optional().nullable(),

            tags: Yup.array()
                .of(Yup.string().max(20, 'Tag too long'))
                .optional().nullable(),
            photos: Yup.array()
                .of(Yup.string().url('Each photo must be a valid URL'))
                .min(1, 'At least one photo is required'),

            dimension: Yup.object({
                length: Yup.number()
                    .nullable()
                    .transform((value, originalValue) => (originalValue === '' ? null : value))
                    .typeError('Length must be a valid number')
                    .min(0, 'Length must be greater than or equal to 0')
                    .notRequired()
                    .nullable(),

                width: Yup.number()
                    .nullable()
                    .transform((value, originalValue) => (originalValue === '' ? null : value))
                    .typeError('Width must be a valid number')
                    .min(0, 'Width must be greater than or equal to 0')
                    .notRequired()
                    .nullable(),

                height: Yup.number()
                    .nullable()
                    .transform((value, originalValue) => (originalValue === '' ? null : value))
                    .typeError('Height must be a valid number')
                    .min(0, 'Height must be greater than or equal to 0')
                    .notRequired()
                    .nullable(),
            })
                .test('all-or-none', 'All dimensions must be provided if one is specified', (value) => {
                    const { length, width, height } = value || undefined;
                    const isAnyFieldFilled = length !== null || width !== null || height !== null;

                    // যদি কোন একটি ফিল্ড পূর্ণ থাকে তাহলে সব ফিল্ড পূরণ হতে হবে
                    return !isAnyFieldFilled || (length !== null && width !== null && height !== null);
                })
                .nullable()
        }),
        onSubmit: async (values, { resetForm }) => {
            setIsLoading(true)

            try {

                const res = await createProduct(values);

                if (res?.status === 201) {
                    // Product created successfully
                    resetForm(); // Reset form fields
                    setResources([]); // Reset photos/resources
                    mutate();
                    toast.success("A product post is successfully!", {
                        id: "addProduct"
                    });
                }
            } catch (error) {
                setIsLoading(false);
                toast.error("Server error ,Please try again later", {
                    id: "addProduct"
                });
            } finally {
                setIsLoading(false);
            }


        },
    });



    // Photo upload handler


    return (
        <div className="p-4 sm:p-6 lg:p-8">

            <div className="max-w-4xl mx-auto ">

                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            />
                            {formik.touched.name && formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}
                        </div>

                        {/* Price */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formik.values.price}
                                placeholder="Price"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            />
                            {formik.touched.price && formik.errors.price && <p className="text-red-500">{formik.errors.price}</p>}
                        </div>

                        {/* Quantity */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formik.values.quantity}
                                placeholder="Qunatity"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            />
                            {formik.touched.quantity && formik.errors.quantity && <p className="text-red-500">{formik.errors.quantity}</p>}
                        </div>

                        {/* Category */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <div className="relative">
                                <SearchableSelectCategory
                                    label="Category"
                                    name="categoryId"
                                    options={categories}
                                    formik={formik}
                                />
                            </div>
                        </div>

                        {/* Brand */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <SearchableSelect
                                label="Brand"
                                name="brandId"
                                options={brands}
                                formik={formik}
                            />
                        </div>

                        {/* Material */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Material</label>
                            <input
                                type="text"
                                name="material"
                                value={formik.values.material}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                                placeholder="Enter material"
                            />
                        </div>

                        {/* Colors Field */}
                        <div className="mb-4">
                            <label htmlFor="colors" className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Colors (comma-separated)</label>
                            <input
                                type="text"
                                id="colors"
                                name="colors"
                                placeholder="Enter colors"
                                className="mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 rounded-md shadow-sm"
                                onChange={(e) => formik.setFieldValue('colors', e.target.value.split(','))}
                                onBlur={formik.handleBlur}
                                value={formik.values.colors.join(',')}
                            />
                            {formik.touched.colors && formik.errors.colors && (
                                <p className="text-red-500 text-sm">{formik.errors.colors}</p>
                            )}
                        </div>

                        {/* Sizes Field */}
                        <div className="mb-4">
                            <label htmlFor="sizes" className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Sizes (comma-separated)</label>
                            <input
                                type="text"
                                id="sizes"
                                name="sizes"
                                placeholder="Enter sizes"
                                className="mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 rounded-md shadow-sm"
                                onChange={(e) => formik.setFieldValue('sizes', e.target.value.split(','))}
                                onBlur={formik.handleBlur}
                                value={formik.values.sizes.join(',')}
                            />
                            {formik.touched.sizes && formik.errors.sizes && (
                                <p className="text-red-500 text-sm">{formik.errors.sizes}</p>
                            )}
                        </div>

                        {/* Tags Field */}
                        <div className="mb-4">
                            <label htmlFor="tags" className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Tags (comma-separated)</label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                placeholder="Enter tags"
                                className="mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 rounded-md shadow-sm"
                                onChange={(e) => formik.setFieldValue('tags', e.target.value.split(','))}
                                onBlur={formik.handleBlur}
                                value={formik.values.tags.join(',')}
                            />
                            {formik.touched.tags && formik.errors.tags && (
                                <p className="text-red-500 text-sm">{formik.errors.tags}</p>
                            )}
                        </div>
                        {/* Dimensions */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300 text-left">Dimension</label>
                            <div className="grid grid-cols-6 gap-5 border-2 p-1 rounded-xl">
                                <div className="mb-4 md:col-span-2 col-span-6">
                                    <label className="block text-gray-700 dark:text-slate-300 text-left">Height</label>
                                    <input
                                        type="number"
                                        name="dimension.height"
                                        value={formik.values.dimension?.height || ""} // Handle undefined or empty values
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Height"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                                    />
                                    {formik.errors.dimension?.height && (
                                        <div className="text-red-600">{formik.errors.dimension?.height}</div>
                                    )}
                                </div>


                                <div className="mb-4 md:col-span-2 col-span-6">
                                    <label className="block text-gray-700 dark:text-slate-300 text-left">Width</label>
                                    <input
                                        type="number"
                                        name="dimension.width"
                                        value={formik.values.dimension?.width || ''} // Handle undefined or empty values
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Width"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                                    />
                                    {formik.errors.dimension?.width && (
                                        <div className="text-red-600">{formik.errors.dimension?.width}</div>
                                    )}
                                </div>
                                <div className="mb-4 md:col-span-2 col-span-6">
                                    <label className="block text-gray-700 dark:text-slate-300 text-left">Length</label>
                                    <input
                                        type="number"
                                        name="dimension.length"
                                        value={formik.values.dimension?.length || ''} // Handle undefined or empty values
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Length"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                                    />
                                    {formik.errors.dimension?.length && (
                                        <div className="text-red-600">{formik.errors.dimension?.length}</div>
                                    )}
                                </div>


                            </div>
                        </div>



                        {/* Warranty */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Warranty</label>
                            <input
                                type="text"
                                name="warranty"
                                value={formik.values.warranty}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                                placeholder="Enter warranty"
                            />
                        </div>

                        {/* Protection */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Protection</label>
                            <input
                                type="text"
                                name="protection"
                                value={formik.values.protection}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                                placeholder="Enter protection"
                            />
                        </div>


                        {/* Tax Percentage */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Tax Percentage</label>
                            <input
                                type="number"
                                name="taxPercentage"
                                value={formik.values.taxPercentage}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Tax Percentage"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            />
                        </div>

                        {/* Delivery Fee */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Delivery Fee</label>
                            <input
                                type="number"
                                name="deliveryFee"
                                value={formik.values.deliveryFee}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Delivery Fee"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            />
                        </div>

                        {/* Availability */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Availability</label>
                            <select
                                name="availability"
                                value={formik.values.availability}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            >
                                <option value="IN_STOCK">In Stock</option>
                                <option value="OUT_OF_STOCK">Out of Stock</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Status</label>
                            <select
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="DISCONTINUED">Discontinued</option>
                            </select>
                        </div>

                        {/* Photos */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700 pb-3 dark:text-slate-300">Photos</label>
                            <div className="flex gap-3 flex-wrap">
                                <CldUploadWidget
                                    signatureEndpoint={`${baseURL}/api/signature/signature`}
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
                                            <button onClick={handleOnClick} className="px-5 flex items-center justify-center gap-2 rounded-full border-2 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300">
                                                <RiImageAddFill />
                                                Upload
                                            </button>
                                        );
                                    }}
                                </CldUploadWidget>
                                <ul className="flex gap-3 flex-wrap">
                                    {photos?.length > 0 &&
                                        photos?.map((photo, index) => {
                                            return (
                                                <li key={index} className="image-preview border-2 rounded dark:border-slate-600 dark:bg-slate-700">
                                                    {photo && <Image
                                                        height={50}
                                                        width={50}

                                                        src={photo}
                                                        alt={`Uploaded ${index + 1}`}
                                                        className=" object-fill"
                                                    />}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            {formik.touched.photos && formik.errors.photos && (
                                <p className="text-red-500 text-sm text-left">{formik.errors.photos}</p>
                            )}
                        </div>
                        {/* Description */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Description</label>
                            <textarea
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                                placeholder="Enter product description"
                                rows="4"
                            ></textarea>
                            {formik.touched?.description && formik.errors.description && <p className="text-red-500">{formik.errors.description}</p>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProductForm;
