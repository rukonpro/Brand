import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, {useEffect, useState} from "react";
import { IoCloseSharp } from "react-icons/io5";
import SearchableSelect from "@/app/components/AdminDashboard/Products/SearchableSelect";
import SearchableSelectCategory from "@/app/components/AdminDashboard/Products/SearchableSelectCategory";
import {updateProduct} from "@/app/utils/product/fetch_products_api";
import toast from "react-hot-toast";
const ProductUpdateForm = ({ initialData,categories,brands,mutate }) => {
const [imageUrls, setImageUrls] = useState(initialData.photos||[]);




    const formik = useFormik({
        initialValues: {
            name: initialData.name || "",
            description: initialData.description || "",
            price: initialData.price||null,
            material: initialData.material || "",
            quantity: initialData.quantity|| null,
            warranty: initialData.warranty || "",
            protection: initialData.protection || "",
            colors: initialData.colors || [],
            sizes: initialData.sizes || [],
            dimension: initialData?.dimension || null,
            tags: initialData?.tags || [],
            discountPercentage: initialData.discountPercentage ||null,
            taxPercentage: initialData?.taxPercentage ||null,
            deliveryFee: initialData?.deliveryFee||null,
            brandId: initialData?.brandId || "",
            categoryId: initialData?.categoryId || "",
            photos: imageUrls,
        },
            validationSchema: Yup.object({
                name: Yup.string()
                    .required('Name is required')
                    .min(2, 'Name must be at least 2 characters')
                    .max(200, 'Name cannot exceed 100 characters'),

                description: Yup.string()
                    .required('Description is required')
                    .min(10, 'Description must be at least 10 characters')
                    .max(5000, 'Description cannot exceed 500 characters'),

                price: Yup.number()
                    .required('Price is required')
                    .min(0, 'Price cannot be negative')
                    .typeError('Price must be a valid number'),

                material: Yup.string()
                    .max(50, 'Material cannot exceed 50 characters'),

                quantity: Yup.number()
                    .required('Quantity is required')
                    .min(0, 'Quantity cannot be negative')
                    .integer('Quantity must be an integer')
                    .typeError('Quantity must be a valid number'),

                warranty: Yup.string()
                    .max(100, 'Warranty cannot exceed 100 characters')
                    .optional(),

                protection: Yup.string()
                    .max(100, 'Protection cannot exceed 100 characters')
                    .optional(),

                colors: Yup.array()
                    .of(Yup.string().max(30, 'Color name too long'))
                    .optional(),

                sizes: Yup.array()
                    .of(Yup.string().max(10, 'Size name too long'))
                    .optional(),

                tags: Yup.array()
                    .of(Yup.string().max(20, 'Tag too long'))
                    .optional(),

                discountPercentage: Yup.number()
                    .nullable() // This allows `null` as a valid value
                    .transform((value, originalValue) => {
                        // This ensures empty strings are treated as `null`
                        return originalValue === "" ? null : value;
                    })
                    .min(0, 'Discount percentage cannot be negative')
                    .max(100, 'Discount percentage cannot exceed 100')
                    .typeError('Discount percentage must be a valid number')
                    .optional(),

                taxPercentage: Yup.number()
                    .nullable() // This allows `null` as a valid value
                    .transform((value, originalValue) => {
                        // This ensures empty strings are treated as `null`
                        return originalValue === "" ? null : value;
                    })
                    .min(0, 'Tax percentage cannot be negative')
                    .max(100, 'Tax percentage cannot exceed 100')
                    .typeError('Tax percentage must be a valid number')
                    .optional(),
                deliveryFee: Yup.number()
                    .nullable() // This allows `null` as a valid value
                    .transform((value, originalValue) => {
                        // This ensures empty strings are treated as `null`
                        return originalValue === null ? null : value;
                    })
                    .min(0, 'Tax delivery fee cannot be negative')
                    .typeError('Delivery fee must be a valid number')
                    .optional(),


                dimension: Yup.object({
                    length: Yup.number()
                        .nullable()
                        .transform((value, originalValue) => (originalValue === '' ? null : value))
                        .typeError('Length must be a valid number')
                        .min(0, 'Length must be greater than or equal to 0')
                        .notRequired(),

                    width: Yup.number()
                        .nullable()
                        .transform((value, originalValue) => (originalValue === '' ? null : value))
                        .typeError('Width must be a valid number')
                        .min(0, 'Width must be greater than or equal to 0')
                        .notRequired(),

                    height: Yup.number()
                        .nullable()
                        .transform((value, originalValue) => (originalValue === '' ? null : value))
                        .typeError('Height must be a valid number')
                        .min(0, 'Height must be greater than or equal to 0')
                        .notRequired(),
                })
                    .test('all-or-none', 'All dimensions must be provided if one is specified', (value) => {
                        const { length, width, height } = value || undefined;
                        const isAnyFieldFilled = length !== null || width !== null || height !== null;

                        // যদি কোন একটি ফিল্ড পূর্ণ থাকে তাহলে সব ফিল্ড পূরণ হতে হবে
                        return !isAnyFieldFilled || (length !== null && width !== null && height !== null);
                    })
                    ,

                brandId: Yup.string()
                    .optional(),

                categoryId: Yup.string().optional(),

                photos: Yup.array()
                    .of(Yup.string().url('Each photo must be a valid URL'))
                    .min(1, 'At least one photo is required')

            }),
        onSubmit: async (values, { setSubmitting }) => {

            const res=await updateProduct({productId:initialData?.id,updateData:values});

            if (res?.status===200){
                mutate();
                toast.success("Product update is successfully",{
                    id:"product"
                })
            }else {
                toast.error("Internal error , please try again",{
                    id:"product"
                })
            }

            setSubmitting(false);
        },
    });



    const handleUploadSuccess = (result) => {
        const newImageUrl = result.info.secure_url;
        setImageUrls((prev) => [...prev, newImageUrl]);
        formik.setFieldValue('photos', [...imageUrls, newImageUrl]);
    };

    const handleUpload = (open) => {
        open();
    };


    const handleRemoveImage = (index) => {
        // Create a new array by filtering out the image at the specified index
        const newImageUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newImageUrls);
        formik.setFieldValue('photos', newImageUrls);
    };



    return (
        <div className="p-3">
            <form onSubmit={formik.handleSubmit}>
                {/* Name Field */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter product name"
                        className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-red-500 text-sm">{formik.errors.name}</p>
                    )}
                </div>

                {/* Description Field */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter description"
                        className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <p className="text-red-500 text-sm">{formik.errors.description}</p>
                    )}
                </div>

                {/* Price Field */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter price"
                        className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 ${formik.touched.price && formik.errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                    />
                    {formik.touched.price && formik.errors.price && (
                        <p className="text-red-500 text-sm">{formik.errors.price}</p>
                    )}
                </div>

                {/* Additional Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="material" className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Material</label>
                        <input
                            type="text"
                            id="material"
                            name="material"
                            placeholder="Enter material"
                            className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 ${formik.touched.material && formik.errors.material ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.material}
                        />
                        {formik.touched.material && formik.errors.material && (
                            <p className="text-red-500 text-sm">{formik.errors.material}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="Enter quantity"
                            className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 ${formik.touched.quantity && formik.errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.quantity}
                        />
                        {formik.touched.quantity && formik.errors.quantity && (
                            <p className="text-red-500 text-sm">{formik.errors.quantity}</p>
                        )}
                    </div>
                </div>

                {/* Warranty and Protection Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="warranty" className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Warranty</label>
                        <input
                            type="text"
                            id="warranty"
                            name="warranty"
                            placeholder="Enter Warranty"
                            className="mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 rounded-md shadow-sm"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.warranty}
                        />
                        {formik.touched.warranty && formik.errors.warranty && (
                            <p className="text-red-500 text-sm">{formik.errors.warranty}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="protection" className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Protection</label>
                        <input
                            type="text"
                            id="protection"
                            name="protection"
                            placeholder="Enter Protection"
                            className="mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 rounded-md shadow-sm"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.protection}
                        />
                        {formik.touched.protection && formik.errors.protection && (
                            <p className="text-red-500 text-sm">{formik.errors.protection}</p>
                        )}
                    </div>
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

                {/* Photos Upload Section */}
                <div className="mb-4">
                  <div className="flex justify-start">
                      <CldUploadWidget
                          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                          signatureEndpoint="/api/signature/signature"
                          onUpload={(result,widget) => {
                              if (result && result.event === 'success') {
                                  handleUploadSuccess(result);
                              }
                          }}
                      >
                          {({ open }) => (
                              <button
                                  type="button"
                                  onClick={() => handleUpload(open)}
                                  className="text-white bg-blue-500 hover:bg-blue-700 rounded px-4 py-2 "
                              >
                                  Upload Image
                              </button>
                          )}
                      </CldUploadWidget>
                  </div>
                    {formik.touched.photos && formik.errors.photos && (
                        <p className="text-red-500 text-sm text-left">{formik.errors.photos}</p>
                    )}
                    {imageUrls.length > 0 && (
                        <ul className="mt-4 grid grid-cols-5 gap-3">
                            {imageUrls.map((url, index) => (
                                <li key={index} className="relative bg-white flex justify-center items-center">
                                    <Image src={url} alt={`Product Image ${index + 1}`} width={100} height={100}/>
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 w-5 h-5 rounded-full p-1"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                       <IoCloseSharp/>
                                    </button>
                                </li>
                            ))}
                        </ul>
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


                {/* Discount Percentage Field */}
                <div className="mb-4">
                    <label htmlFor="discountPercentage"
                           className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Discount
                        Percentage</label>
                    <input
                        type="number"
                        id="discountPercentage"
                        name="discountPercentage"
                        placeholder="Enter discount percentage"
                        className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 ${formik.touched.discountPercentage && formik.errors.discountPercentage ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.discountPercentage}
                    />
                    {formik.touched.discountPercentage && formik.errors.discountPercentage && (
                        <p className="text-red-500 text-sm">{formik.errors.discountPercentage}</p>
                    )}
                </div>

                {/* Tax Percentage Field */}
                <div className="mb-4">
                    <label htmlFor="taxPercentage"
                           className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Tax
                        Percentage</label>
                    <input
                        type="number"
                        id="taxPercentage"
                        name="taxPercentage"
                        placeholder="Enter Tax Percentage"
                        className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 ${formik.touched.taxPercentage && formik.errors.taxPercentage ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.taxPercentage}
                    />
                    {formik.touched.taxPercentage && formik.errors.taxPercentage && (
                        <p className="text-red-500 text-sm">{formik.errors.taxPercentage}</p>
                    )}
                </div>

                {/* Delivery Fee Field */}
                <div className="mb-4">
                    <label htmlFor="deliveryFee"
                           className="block text-sm font-medium text-slate-700 dark:text-slate-300 text-left">Delivery
                        Fee</label>
                    <input
                        type="number"
                        id="deliveryFee"
                        name="deliveryFee"
                        placeholder="Enter Delivery Fee"
                        className={`mt-1 block w-full px-3 py-2 border dark:bg-slate-700 dark:text-slate-200 ${formik.touched.deliveryFee && formik.errors.deliveryFee ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.deliveryFee}
                    />
                    {formik.touched.deliveryFee && formik.errors.deliveryFee && (
                        <p className="text-red-500 text-sm">{formik.errors.deliveryFee}</p>
                    )}
                </div>

                {/* Brand and Category Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>

                        <SearchableSelect
                            label="Brand"
                            name="brandId"
                            defaultName={initialData?.brand?.name}
                            options={brands}
                            formik={formik}
                        />
                        {formik.touched.brandId && formik.errors.brandId && (
                            <p className="text-red-500 text-sm">{formik.errors.brandId}</p>
                        )}
                    </div>

                    <div>

                        <SearchableSelectCategory
                            label="Category"
                            name="categoryId"
                            defaultName={initialData?.category?.name}
                            options={categories}
                            formik={formik}
                        />
                    </div>
                    {formik.touched.categoryId && formik.errors.categoryId && (
                        <p className="text-red-500 text-sm">{formik.errors.categoryId}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {formik.isSubmitting?"Updating...":" Update Product"}
                </button>
            </form>
        </div>
    );
};

export default ProductUpdateForm;



// const brands=[
//     {
//         id:"1",
//         name:"BD",
//         logo:"sd",
//
//     },
//     {
//         id:"2",
//         name:"iphone",
//         logo:"sd",
//
//     }
// ]