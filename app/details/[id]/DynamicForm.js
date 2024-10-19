"use client"
import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

const DynamicProductForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.number().required('Required').positive('Must be a positive number'),
    image: Yup.string().url('Invalid URL').required('Required'),
    attributes: Yup.object().required('Required'),
    variants: Yup.array().of(Yup.object()).required('Required'),
  });

  const initialValues = {
    name: '',
    description: '',
    price: 0,
    image: '',
    attributes: {}, // Initially empty, user adds keys dynamically
    variants: [{}],  // Initially empty objects, user adds dynamic keys
  };

  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
          <h1 className="text-2xl font-bold mb-4">Create Dynamic Product</h1>

          {/* Name */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Name</label>
            <Field
              name="name"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Description</label>
            <Field
              name="description"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter product description"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Price</label>
            <Field
              name="price"
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter product price"
            />
          </div>

          {/* Image */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Image URL</label>
            <Field
              name="image"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter image URL"
            />
          </div>

          {/* Dynamic Attributes */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Dynamic Attributes</h3>
            <FieldArray name="attributes">
              {({ remove, push }) => (
                <>
                  {Object.keys(values.attributes).map((key, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-gray-700 font-medium">{key}</label>
                      <FieldArray name={`attributes.${key}`}>
                        {({ remove: removeValue, push: pushValue }) => (
                          <div className="space-y-2">
                            {values.attributes[key].map((_, i) => (
                              <div key={i} className="flex space-x-2">
                                <Field
                                  name={`attributes.${key}.${i}`}
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  placeholder={`Enter ${key} value`}
                                />
                                <button
                                  type="button"
                                  className="text-red-500"
                                  onClick={() => removeValue(i)}
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              className="text-blue-500"
                              onClick={() => pushValue('')}
                            >
                              Add Value
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => {
                          const updatedAttributes = { ...values.attributes };
                          delete updatedAttributes[key];
                          setFieldValue('attributes', updatedAttributes);
                        }}
                      >
                        Remove Attribute
                      </button>
                    </div>
                  ))}

                  {/* Add New Attribute Key */}
                  <button
                    type="button"
                    className="mt-4 text-blue-500"
                    onClick={() => {
                      const newKey = prompt('Enter new attribute key');
                      if (newKey) {
                        setFieldValue(`attributes.${newKey}`, []);
                      }
                    }}
                  >
                    Add Attribute
                  </button>
                </>
              )}
            </FieldArray>
          </div>

          {/* Dynamic Variants */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Dynamic Variants</h3>
            <FieldArray name="variants">
              {({ remove, push }) => (
                <>
                  {values.variants.map((variant, variantIndex) => (
                    <div key={variantIndex} className="space-y-4 border p-4 rounded-lg">
                      {Object.keys(variant).map((key, i) => (
                        <div key={i} className="space-y-2">
                          <label className="block text-gray-700 font-medium">{key}</label>
                          <Field
                            name={`variants.${variantIndex}.${key}`}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder={`Enter ${key}`}
                          />
                        </div>
                      ))}

                      {/* Add new field to this variant */}
                      <button
                        type="button"
                        className="text-blue-500 mt-2"
                        onClick={() => {
                          const newKey = prompt('Enter new field key for this variant');
                          if (newKey) {
                            setFieldValue(`variants.${variantIndex}.${newKey}`, '');
                          }
                        }}
                      >
                        Add Field to Variant
                      </button>

                      <button
                        type="button"
                        className="text-red-500 mt-2"
                        onClick={() => remove(variantIndex)}
                      >
                        Remove Variant
                      </button>
                    </div>
                  ))}

                  {/* Add New Variant */}
                  <button
                    type="button"
                    className="mt-4 text-blue-500"
                    onClick={() => push({})}
                  >
                    Add Variant
                  </button>
                </>
              )}
            </FieldArray>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicProductForm;
