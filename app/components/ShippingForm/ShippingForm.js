import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";

import create_sipping_address from "@/app/utils/shippingAdress/create_sipping_address_api";
import toast from "react-hot-toast";
import { PiHandbagFill, PiHandbagLight } from 'react-icons/pi';
const validatePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value, "BD"); // Default to Bangladesh or change to your preference
    if (!phoneNumber || !phoneNumber.isValid()) {
        return "Invalid phone number";
    }
    return null;
};

const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string()
        .required("Phone Number is required")
        .test("is-valid-phone", "Invalid phone number", (value) => {
            return validatePhoneNumber(value) === null;
        })
    ,
    country: Yup.string().required("Country is required"),
    region: Yup.string().required("Region is required"),
    city: Yup.string().required("City is required"),
    streetAddress: Yup.string().required("Building / House No / Floor / Street is required"),
    landmarkArea: Yup.string().required("Colony / Suburb / Locality / Landmark is required"),
    postalCode: Yup.number().required("Postal code is required"),
    address: Yup.string().required("Address is required"),
    deliveryLabel: Yup.string().required("delivery label is required"),
});


const ShippingForm = ({ user, onClose }) => {
    const [loading, setLoading] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            country: "",
            region: "",
            city: "",
            streetAddress: "",
            postalCode: "",
            landmarkArea: "",
            address: "",
            deliveryLabel: ""
        },
        validationSchema,
        onSubmit: async (values) => {
            values.userId = user?.id
            setLoading(true);

            const res = await create_sipping_address(values);
            if (res?.data?.error) {
                toast.error(res.data.error, {
                    id: "shipping"
                });
                setLoading(false)

            }
            if (res?.status === 201) {
                toast.success("Sipping address add is successfully", {
                    id: "shipping"
                });
                onClose();
                setLoading(false);
            }

        },
    });

   

    return (
        <form onSubmit={formik.handleSubmit} className=" p-3 rounded-lg">
            <div className="flex justify-between items-center">
                <h1 className="text-md font-bold pb-2 text-slate-700 dark:text-slate-400">Shipping address:</h1>
            </div>
            <div className="grid sm:grid-cols-4 md:grid-cols-4 gap-4  md:px-0">
                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="firstName" className="text-lg">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.firstName && formik.errors.firstName ?
                        <div className="text-red-500">{formik.errors.firstName}</div> : null}
                </div>

                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="lastName" className="text-lg">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.lastName && formik.errors.lastName ?
                        <div className="text-red-500">{formik.errors.lastName}</div> : null}
                </div>

                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="phoneNumber" className="text-lg">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ?
                        <div className="text-red-500">{formik.errors.phoneNumber}</div> : null}
                </div>

                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="country" className="text-lg">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        placeholder="Please Enter"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.country && formik.errors.country ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.country && formik.errors.country ?
                        <div className="text-red-500">{formik.errors.country}</div> : null}
                </div>

                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="region" className="text-lg">Region:</label>
                    <input
                        type="text"
                        id="region"
                        name="region"
                        placeholder="Please Enter"
                        value={formik.values.region}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.region && formik.errors.region ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.region && formik.errors.region ?
                        <div className="text-red-500">{formik.errors.region}</div> : null}
                </div>

                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="city" className="text-lg">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Plases Enter"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.city && formik.errors.city ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.city && formik.errors.city ?
                        <div className="text-red-500">{formik.errors.city}</div> : null}
                </div>

                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="streetAddress" className="text-lg">Building / House No / Floor / Street:</label>
                    <input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        placeholder="Plases Enter"
                        value={formik.values.streetAddress}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.streetAddress && formik.errors.streetAddress ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.streetAddress && formik.errors.streetAddress ?
                        <div className="text-red-500">{formik.errors.streetAddress}</div> : null}
                </div>

                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="landmarkArea" className="text-lg">Colony / Suburb / Locality / Landmark:</label>
                    <input
                        type="text"
                        id="landmarkArea"
                        name="landmarkArea"
                        placeholder="Please Enter"
                        value={formik.values.landmarkArea}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.landmarkArea && formik.errors.landmarkArea ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.landmarkArea && formik.errors.landmarkArea ?
                        <div className="text-red-500">{formik.errors.landmarkArea}</div> : null}
                </div>


                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="postalCode" className="text-lg">Postal code:</label>
                    <input
                        type="number"
                        id="postalCode"
                        name="postalCode"
                        placeholder="Plases Enter"
                        value={formik.values.postalCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.postalCode && formik.errors.postalCode ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.postalCode && formik.errors.postalCode ?
                        <div className="text-red-500">{formik.errors.postalCode}</div> : null}
                </div>

                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="address" className="text-lg">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="For Example: House# 123, Street# 123, ABC Road"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.address && formik.errors.address ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.address && formik.errors.address ?
                        <div className="text-red-500">{formik.errors.address}</div> : null}
                </div>

                <div className="sm:col-span-2 col-span-4">
                    <p>Select a label for effective delivery:</p>
                    <div className='flex gap-5 pt-2'>
                        <button
                            type='button'
                            onClick={() => formik.setFieldValue('deliveryLabel', "home")}
                            className='border-2 border-blue-500 py-3 px-5 rounded-lg flex items-center gap-2 text-blue-500'>
                            {formik.values?.deliveryLabel === "home" ? <IoHomeSharp /> : < IoHomeOutline />} Home
                        </button>
                        <button
                            type='button'
                            onClick={() => formik.setFieldValue('deliveryLabel', "office")}
                            className='border-2 border-blue-500 py-3 px-5 rounded-lg flex items-center gap-2 text-blue-500'
                        >
                            {formik.values?.deliveryLabel === "office" ? <PiHandbagFill /> : <PiHandbagLight />}  Office
                        </button>
                    </div>
                    {formik.errors.address ?
                        <div className="text-red-500">{formik.errors.deliveryLabel}</div> : null}
                </div>

                <div className="col-span-4">
                    <button type="submit"
                        disabled={loading}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ShippingForm;