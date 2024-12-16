"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function PriceFilter() {
    // Validation schema using Yup
    const validationSchema = Yup.object({
        minPrice: Yup.number()
            .min(0, "Price cannot be negative")
            .required("Minimum price is required"),
        maxPrice: Yup.number()
            .min(Yup.ref("minPrice"), "Max price should be greater than Min price")
            .required("Maximum price is required"),
    });

    const handleSubmit = (values) => {
        console.log("Form Values:", values);
        // Add logic for filtering products here
    };

    return (
        <div className="p-4 w-full border-b">
            <label className="text-sm font-medium text-gray-700 ">
                Price
            </label>
            <Formik
                initialValues={{ minPrice: "", maxPrice: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="grid grid-cols-12 gap-4">
                        {/* Label */}


                        {/* Inputs */}
                        <div className="flex justify-between col-span-10 items-center">
                            <div>
                                <Field
                                    type="number"
                                    name="minPrice"
                                    placeholder="Min"
                                    value={values.minPrice}
                                    onChange={(e) => {
                                        const value = Math.max(0, parseInt(e.target.value) || 0);
                                        setFieldValue("minPrice", value);
                                    }}
                                    className="w-16 p-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <ErrorMessage
                                    name="minPrice"
                                    component="div"
                                    className="text-red-500 text-xs"
                                />
                            </div>

                            <span className="mx-2 text-gray-500">-</span>

                            <div>
                                <Field
                                    type="number"
                                    name="maxPrice"
                                    placeholder="Max"
                                    value={values.maxPrice}
                                    onChange={(e) => {
                                        const value = Math.max(0, parseInt(e.target.value) || 0);
                                        setFieldValue("maxPrice", value);
                                    }}
                                    className="w-16 p-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <ErrorMessage
                                    name="maxPrice"
                                    component="div"
                                    className="text-red-500 text-xs"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="col-span-2 bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded"
                            disabled={isSubmitting}
                        >
                            &#9654;
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
