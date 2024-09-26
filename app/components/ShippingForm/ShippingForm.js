import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import create_sipping_address from "@/app/utils/shippingAdress/create_sipping_address_api";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
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
    houseNumber: Yup.string().required("House/Office number is required"),
    street: Yup.string().required("Street name is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.number().required("Postal code is required"),
    state: Yup.string().required("State/Province is required"),
});


const ShippingForm = ({setNewAddress}) => {
const [loading, setLoading] = React.useState(false);
const {data:userData}=useSession();
const {user}=userData;
    const formik = useFormik({
        initialValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            phoneNumber: user?.phoneNumber || "",
            country: user?.country || "",
            houseNumber: user?.houseNumber || "",
            street: user?.street || "",
            city: user?.city || "",
            postalCode: user?.postalCode || "",
            state: user?.state || "",
        },
        validationSchema,
        onSubmit: async (values) => {
           values.userId=user?.id
            setLoading(true);

          const res= await create_sipping_address(values);
           if (res?.data?.error){
               toast.error(res.data.error,{
                   id:"shipping"
               });

           }
            if (res?.data?.id){
                toast.success("Sipping address add is successfully",{
                    id:"shipping"
                });
                setNewAddress(false)
            }
            setLoading(false)
        },
    });


    return (
        <form onSubmit={formik.handleSubmit} className=" p-3 rounded-lg">
            <div className="flex justify-between items-center">
                <h1 className="text-md font-bold pb-2 text-slate-700 dark:text-slate-400">Shipping address:</h1>
                {setNewAddress&&<button type="button"
                         onClick={() => setNewAddress(false)}
                         className="text-sm px-2 py-1 rounded-md  border-1 border-blue-500 bg-white hover:bg-slate-300 shadow  text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:dark:bg-slate-700">Cancel</button>}
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
                        placeholder="Country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.country && formik.errors.country ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.country && formik.errors.country ?
                        <div className="text-red-500">{formik.errors.country}</div> : null}
                </div>

                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="houseNumber" className="text-lg">House/Office number:</label>
                    <input
                        type="text"
                        id="houseNumber"
                        name="houseNumber"
                        placeholder="House/Office number"
                        value={formik.values.houseNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.houseNumber && formik.errors.houseNumber ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.houseNumber && formik.errors.houseNumber ?
                        <div className="text-red-500">{formik.errors.houseNumber}</div> : null}
                </div>

                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="street" className="text-lg">Street name:</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        placeholder="Street name"
                        value={formik.values.street}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.street && formik.errors.street ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.street && formik.errors.street ?
                        <div className="text-red-500">{formik.errors.street}</div> : null}
                </div>

                <div className="sm:col-span-2 col-span-4">
                    <label htmlFor="city" className="text-lg">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.city && formik.errors.city ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.city && formik.errors.city ?
                        <div className="text-red-500">{formik.errors.city}</div> : null}
                </div>

                <div>
                    <label htmlFor="postalCode" className="text-lg">Postal code:</label>
                    <input
                        type="number"
                        id="postalCode"
                        name="postalCode"
                        placeholder="Postal code"
                        value={formik.values.postalCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.postalCode && formik.errors.postalCode ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.postalCode && formik.errors.postalCode ?
                        <div className="text-red-500">{formik.errors.postalCode}</div> : null}
                </div>

                <div>
                    <label htmlFor="state" className="text-lg">State/Province:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="State/Province"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`px-3 py-2 rounded-lg mt-1 w-full dark:bg-slate-800 ${formik.touched.state && formik.errors.state ? 'border-red-500' : ''}`}
                    />
                    {formik.touched.state && formik.errors.state ?
                        <div className="text-red-500">{formik.errors.state}</div> : null}
                </div>

                <div className="col-span-4">
                    <button type="submit"
                            disabled={loading}
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">
                        {loading?"Submitting...":"Submit"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ShippingForm;