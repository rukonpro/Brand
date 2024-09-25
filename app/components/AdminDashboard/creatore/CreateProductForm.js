"use client";
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BackButton from "@/app/components/BackButtons/BackButton";
import {uploadImages} from "@/app/utils/imageUploader/imageUploader";
import {createProduct} from "@/app/utils/product/fetch_products_api";

const CreateProductForm = ({ categories, brands }) => {
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [tags, setTags] = useState([]);
    const [availability, setAvailability] = useState('IN_STOCK'); // Default availability
    const [status, setStatus] = useState('ACTIVE'); // Default status

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
            length: '',
            width: '',
            height: '',
            material: '', // Add material
            warranty: '', // Add warranty
            protection: '', // Add protection
            tags: [], // Dynamic tags array
            availability: 'IN_STOCK', // Add availability
            status: 'ACTIVE', // Add status
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Product name is required'),
            price: Yup.number().required('Product price is required'),
            description: Yup.string().required('Description is required'),
            quantity: Yup.number().required('Product quantity is Required'),
            categoryId: Yup.string().nullable(),
            brandId: Yup.string().nullable(),
            length: Yup.number().nullable(),
            width: Yup.number().nullable(),
            height: Yup.number().nullable(),
            material: Yup.string().nullable(), // Validate material
            warranty: Yup.string().nullable(), // Validate warranty
            protection: Yup.string().nullable(), // Validate protection
            taxPercentage: Yup.number().min(0).nullable(), // Validate tax
            deliveryFee: Yup.number().min(0).nullable(), // Validate delivery fee
        }),
        onSubmit:async (values) => {

            //
            const data =await { ...values, colors, sizes, photos, tags };

            const res = await uploadImages(photos);
            const uploadedPhotos= res?.photos


            if (res.photos) {
               const data={
                   name: values?.name,
                   description: values?.name,
                   photos: uploadedPhotos,
                   price: values?.price,
                   material: values?.material,
                   quantity: values?.quantity,
                   colors: colors,
                   sizes: sizes,
                   rating: values?.rating,
                   tags: tags,
                   availability: values?.availability,
                   status: values?.status,
                   brandId: values?.brandId,
                   categoryId: values?.categoryId,
               }

               if(!values?.length||!values?.width||!values?.height){
                   data.dimension=undefined
               }else {
                   data.description={
                       length: values?.length,
                       width: values?.width,
                       height: values?.height,
                   }
               }

               const res=await createProduct(data)
console.log(res)
            } else {

            }
        },
    });




    // Add and remove functions for colors
    const addColorField = () => setColors([...colors, '']);
    const removeColorField = (index) => {
        setColors(colors.filter((_, i) => i !== index));
    };
    const handleColorChange = (index, value) => {
        const updatedColors = [...colors];
        updatedColors[index] = value;
        setColors(updatedColors);
    };

    // Add and remove functions for sizes
    const addSizeField = () => setSizes([...sizes, '']);
    const removeSizeField = (index) => {
        setSizes(sizes.filter((_, i) => i !== index));
    };
    const handleSizeChange = (index, value) => {
        const updatedSizes = [...sizes];
        updatedSizes[index] = value;
        setSizes(updatedSizes);
    };

    // Add and remove functions for tags
    const addTagField = () => setTags([...tags, '']);
    const removeTagField = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };
    const handleTagChange = (index, value) => {
        const updatedTags = [...tags];
        updatedTags[index] = value;
        setTags(updatedTags);
    };

    // Photo upload handler
    const handlePhotoUpload = (e) => setPhotos([...photos, ...e.target.files]);

    return (
        <div className="p-4 sm:p-6 lg:p-8">

            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl sm:text-2xl font-semibold">Create a Product</h1>
                    <BackButton title="Back"/>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                placeholder="Name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}
                        </div>

                        {/* Price */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.errors.price && <p className="text-red-500">{formik.errors.price}</p>}
                        </div>

                        {/* Quantity */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.errors.quantity && <p className="text-red-500">{formik.errors.quantity}</p>}
                        </div>

                        {/* Category */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700">Category</label>
                            <div className="relative">
                                <select
                                    name="categoryId"
                                    value={formik.values.categoryId}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select a Category</option>
                                    {categories?.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.categoryId && <p className="text-red-500">{formik.errors.categoryId}</p>}
                            </div>
                        </div>

                        {/* Brand */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700">Brand</label>
                            <select
                                name="brandId"
                                value={formik.values.brandId}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a Brand</option>
                                {brands?.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.brandId && <p className="text-red-500">{formik.errors.brandId}</p>}
                        </div>

                        {/* Colors */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700">Colors</label>
                            {colors.map((color, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={color}
                                        onChange={(e) => handleColorChange(index, e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter color"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeColorField(index)}
                                        className="ml-2 text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addColorField}
                                className="text-blue-600 mt-2"
                            >
                                + Add Color
                            </button>
                        </div>

                        {/* Sizes */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700">Sizes</label>
                            {sizes.map((size, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={size}
                                        onChange={(e) => handleSizeChange(index, e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter size"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSizeField(index)}
                                        className="ml-2 text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSizeField}
                                className="text-blue-600 mt-2"
                            >
                                + Add Size
                            </button>
                        </div>

                        {/* Tags */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700">Tags</label>
                            {tags.map((tag, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={tag}
                                        onChange={(e) => handleTagChange(index, e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter tag"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeTagField(index)}
                                        className="ml-2 text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addTagField}
                                className="text-blue-600 mt-2"
                            >
                                + Add Tag
                            </button>
                        </div>

                        {/* Dimensions */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700">Length</label>
                            <input
                                type="number"
                                name="length"
                                value={formik.values.length}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700">Width</label>
                            <input
                                type="number"
                                name="width"
                                value={formik.values.width}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700">Height</label>
                            <input
                                type="number"
                                name="height"
                                value={formik.values.height}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Material */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700">Material</label>
                            <input
                                type="text"
                                name="material"
                                value={formik.values.material}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter material"
                            />
                        </div>

                        {/* Warranty */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700">Warranty</label>
                            <input
                                type="text"
                                name="warranty"
                                value={formik.values.warranty}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter warranty"
                            />
                        </div>

                        {/* Protection */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700">Protection</label>
                            <input
                                type="text"
                                name="protection"
                                value={formik.values.protection}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter protection"
                            />
                        </div>


                        {/* Tax Percentage */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700">Tax Percentage</label>
                            <input
                                type="number"
                                name="taxPercentage"
                                value={formik.values.taxPercentage}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Delivery Fee */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700">Delivery Fee</label>
                            <input
                                type="number"
                                name="deliveryFee"
                                value={formik.values.deliveryFee}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Availability */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700">Availability</label>
                            <select
                                name="availability"
                                value={availability}
                                onChange={(e) => setAvailability(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="IN_STOCK">In Stock</option>
                                <option value="OUT_OF_STOCK">Out of Stock</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700">Status</label>
                            <select
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="DISCONTINUED">Discontinued</option>
                            </select>
                        </div>

                        {/* Photos */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700">Photos</label>
                            <input
                                type="file"
                                multiple
                                onChange={handlePhotoUpload}
                                className="border rounded-md py-2 px-4"
                            />
                        </div>
                        {/* Description */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter product description"
                                rows="4"
                            ></textarea>
                            {formik.errors.description && <p className="text-red-500">{formik.errors.description}</p>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                    >
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProductForm;
