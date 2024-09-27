"use client";
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RiDeleteBack2Fill } from "react-icons/ri";
import { BsPlusCircleFill } from "react-icons/bs";

import {createProduct} from "@/app/utils/product/fetch_products_api";
import baseURL from "@/app/utils/baseURL";
import {CldUploadWidget} from "next-cloudinary";
import { RiImageAddFill } from "react-icons/ri";

import Image from "next/image";
import toast from "react-hot-toast";

const CreateProductForm = ({ categories, brands }) => {
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [resources, setResources] = useState([]);
    const [tags, setTags] = useState([]);
    const [availability, setAvailability] = useState('IN_STOCK'); // Default availability
    const [status, setStatus] = useState('ACTIVE'); // Default status
    const [isLoading,setIsLoading]=useState(false)
    const photos=resources?.map(resource=>resource?.secure_url);

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
        onSubmit:async (values, { resetForm }) => {
            setIsLoading(true)
            const data =await { ...values, colors, sizes, photos, tags };

            if (photos.length>0) {
               const data={
                   name: values?.name,
                   description: values?.name,
                   photos: photos,
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

                try {

                    const res = await createProduct(data);

                    if (res?.status === 201) {
                        // Product created successfully
                        resetForm(); // Reset form fields
                        setColors([]); // Reset colors
                        setSizes([]); // Reset sizes
                        setTags([]); // Reset tags
                        setResources([]); // Reset photos/resources
                        setAvailability('IN_STOCK'); // Reset availability
                        setStatus('ACTIVE'); // Reset status

                        toast.success("A product post is successfully!",{
                            id:"addProduct"
                        });
                    }
                } catch (error) {
                    setIsLoading(false);
                  toast.error("Server error ,Please try again later",{
                      id:"addProduct"
                  });
                }finally {
                    setIsLoading(false);
                }

            } else {

                setIsLoading(false);
                toast.error("Select minimum a photo then please try again later",{
                    id:"addProduct"
                });
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
                                placeholder="Name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            />
                            {formik.errors.name && <p className="text-red-500">{formik.errors.name}</p>}
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
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            />
                            {formik.errors.price && <p className="text-red-500">{formik.errors.price}</p>}
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
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            />
                            {formik.errors.quantity && <p className="text-red-500">{formik.errors.quantity}</p>}
                        </div>

                        {/* Category */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Category</label>
                            <div className="relative">
                                <select
                                    name="categoryId"
                                    value={formik.values.categoryId}
                                    onChange={formik.handleChange}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
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
                            <label className="block text-gray-700 dark:text-slate-300">Brand</label>
                            <select
                                name="brandId"
                                value={formik.values.brandId}
                                onChange={formik.handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
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

                      <div className=" col-span-2 grid md:grid-cols-3 gap-5">
                          {/* Colors */}
                          <div className="mb-4 ">
                              <label className="block text-gray-700 dark:text-slate-300">Colors</label>
                              {colors.map((color, index) => (
                                  <div key={index} className="flex items-center mb-2">
                                      <input
                                          type="text"
                                          value={color}
                                          onChange={(e) => handleColorChange(index, e.target.value)}
                                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                                          placeholder="Enter color"
                                      />
                                      <button
                                          type="button"
                                          onClick={() => removeColorField(index)}
                                          className="text-red-600   p-2"
                                      >
                                          <RiDeleteBack2Fill className="size-5" />
                                      </button>
                                  </div>
                              ))}
                              <button
                                  type="button"
                                  onClick={addColorField}
                                  className=" p-2"
                              >
                                  <BsPlusCircleFill className="size-5 text-slate-700 dark:text-blue-500"/>
                              </button>
                          </div>

                          {/* Sizes */}
                          <div className="mb-4 ">
                              <label className="block text-gray-700 dark:text-slate-300">Sizes</label>
                              {sizes.map((size, index) => (
                                  <div key={index} className="flex items-center mb-2">
                                      <input
                                          type="text"
                                          value={size}
                                          onChange={(e) => handleSizeChange(index, e.target.value)}
                                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                                          placeholder="Enter size"
                                      />
                                      <button
                                          type="button"
                                          onClick={() => removeSizeField(index)}
                                          className="ml-2 text-red-600   p-2"
                                      >
                                          <RiDeleteBack2Fill className="size-5" />
                                      </button>
                                  </div>
                              ))}
                              <button
                                  type="button"
                                  onClick={addSizeField}
                                  className=" p-2"
                              >
                                  <BsPlusCircleFill className="size-5 text-slate-700 dark:text-blue-500"/>
                              </button>
                          </div>

                          {/* Tags */}
                          <div className="mb-4 ">
                              <label className="block text-gray-700 dark:text-slate-300">Tags</label>
                              {tags.map((tag, index) => (
                                  <div key={index} className="flex items-center mb-2">
                                      <input
                                          type="text"
                                          value={tag}
                                          onChange={(e) => handleTagChange(index, e.target.value)}
                                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                                          placeholder="Enter tag"
                                      />
                                      <button
                                          type="button"
                                          onClick={() => removeTagField(index)}
                                          className="ml-2 text-red-600   p-2"
                                      >
                                          <RiDeleteBack2Fill className="size-5" />
                                      </button>
                                  </div>
                              ))}
                              <button
                                  type="button"
                                  onClick={addTagField}
                                  className=" p-2"
                              >
                                  <BsPlusCircleFill className="size-5 text-slate-700 dark:text-blue-500"/>
                              </button>
                          </div>

                      </div>
                        {/* Dimensions */}
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Length</label>
                            <input
                                type="number"
                                name="length"
                                value={formik.values.length}
                                onChange={formik.handleChange}
                                placeholder="Length"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            />
                        </div>
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Width</label>
                            <input
                                type="number"
                                name="width"
                                value={formik.values.width}
                                onChange={formik.handleChange}
                                placeholder="Width"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            />
                        </div>
                        <div className="mb-4 md:col-span-1 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Height</label>
                            <input
                                type="number"
                                name="height"
                                value={formik.values.height}
                                onChange={formik.handleChange}
                                placeholder="height"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            />
                        </div>

                        {/* Material */}
                        <div className="mb-4 col-span-2">
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

                        {/* Warranty */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Warranty</label>
                            <input
                                type="text"
                                name="warranty"
                                value={formik.values.warranty}
                                onChange={formik.handleChange}
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
                                placeholder="Delivery Fee"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                            />
                        </div>

                        {/* Availability */}
                        <div className="mb-4 col-span-2">
                            <label className="block text-gray-700 dark:text-slate-300">Availability</label>
                            <select
                                name="availability"
                                value={availability}
                                onChange={(e) => setAvailability(e.target.value)}
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
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
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
                                            <button onClick={handleOnClick} className="px-5 flex items-center justify-center gap-2 rounded-full border-2 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300">
                                                <RiImageAddFill />
                                                Upload
                                            </button>
                                        );
                                    }}
                                </CldUploadWidget>
                                <ul className="flex gap-3 flex-wrap">
                                    {photos?.length>0&&
                                        photos?.map((photo, index) => {
                                            return (
                                                <li key={index} className="image-preview border-2 rounded dark:border-slate-600 dark:bg-slate-700">
                                                    <Image
                                                        height={50}
                                                        width={50}

                                                        src={photo}
                                                        alt={`Uploaded ${index + 1}`}
                                                        className=" object-fill"
                                                    />
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
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
                            {formik.errors.description && <p className="text-red-500">{formik.errors.description}</p>}
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
