import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DynamicFields from './NewComponent/DynamicFields';
import Image from 'next/image';
import { RiImageAddFill } from 'react-icons/ri';
import { CldUploadWidget } from 'next-cloudinary';
import baseURL from '@/app/utils/baseURL';

const ProductForm = () => {
  const [tags, setTags] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    basePrice: Yup.number()
      .required('Base Price is required')
      .positive('Base Price must be positive'),
    brandId: Yup.string().required('Brand ID is required'),
    categoryId: Yup.string().required('Category ID is required'),
    warranty: Yup.string().required('Warranty is required'),
    protection: Yup.string().required('Protection is required'),
    images: Yup.array().min(1, 'At least one image is required'),
    specifications: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required('Specification name is required'),
          value: Yup.string().required('Specification value is required')
        })
      ),
    tags: Yup.array().of(Yup.string()).min(1, 'At least one tag is required'),
    variants: Yup.array().of(
      Yup.object().shape({
        attributes: Yup.array().of(
          Yup.object().shape({
            attributeName: Yup.string().required('Attribute name is required'),
            attributeValue: Yup.string().required('Attribute value is required')
          })
        ).min(1, 'At least one attribute is required for each variant'),
        price: Yup.number()
          .required('Price is required')
          .positive('Price must be positive'),
        stock: Yup.number()
          .required('Stock is required')
          .positive('Stock must be positive'),
        availability: Yup.string().required('Availability is required'),
        images: Yup.array().min(1, 'At least one image is required for the variant')
      })
    ).min(1, 'At least one variant is required')
  });




  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      basePrice: '',
      brandId: '',
      categoryId: '',
      warranty: '',
      protection: '',
      images: [],
      variants: [],
      specifications: [],
      tags: []

    },
    validationSchema,
    onSubmit: (values) => {
      console.log({
        ...values,
        tags: tags.split(','),
       
      });
    },
  });



  //**********  Specification  **********//

  const addSpecification = () => {
    formik.setFieldValue("specifications", [...formik.values.specifications, { name: '', value: '' }]);

  };
  console.log(formik.values.specifications)
  const updateSpecification = (index, key, value) => {
    const updatedFields = [...formik.values.specifications];
    updatedFields[index][key] = value;
    formik.setFieldValue("specifications", updatedFields);
  };

  const removeSpecification = (index) => {
    formik.setFieldValue("specifications", formik.values.specifications.filter((_, i) => i !== index));
  };


  // *********** variants *****************//



  const addVariant = () => {
    formik.setFieldValue("variants", [...formik.values?.variants, { attributes: [], price: '', stock: '', availability: 'IN_STOCK', images: [] }]);
  };

  const updateVariant = (index, key, value) => {
    const updatedVariants = [...formik.values?.variants];
    updatedVariants[index][key] = value;
    formik.setFieldValue("variants", updatedVariants);
  };

  const removeVariant = (index) => {
    formik.setFieldValue("variants", formik.values?.variants.filter((_, i) => i !== index));
  };



  const handleVariantImageUpload = (index, url) => {
    const updatedVariants = [...formik.values?.variants];
    updatedVariants[index].images = [...updatedVariants[index].images, url];
    formik.setFieldValue("variants", updatedVariants);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

      <input
        type="text"
        placeholder="Name"
        {...formik.getFieldProps('name')}
        className="border p-2 rounded w-full mb-2"
      />
      {formik.touched.name && formik.errors.name && (
        <div className="text-red-500">{formik.errors.name}</div>
      )}

      <textarea
        placeholder="Description"
        {...formik.getFieldProps('description')}
        className="border p-2 rounded w-full mb-2"
      />
      {formik.touched.description && formik.errors.description && (
        <div className="text-red-500">{formik.errors.description}</div>
      )}

      <input
        type="number"
        placeholder="Base Price"
        {...formik.getFieldProps('basePrice')}
        className="border p-2 rounded w-full mb-2"
      />
      {formik.touched.basePrice && formik.errors.basePrice && (
        <div className="text-red-500">{formik.errors.basePrice}</div>
      )}

      <input
        type="text"
        placeholder="Warranty"
        {...formik.getFieldProps('warranty')}
        className="border p-2 rounded w-full mb-2"
      />
      {formik.touched.warranty && formik.errors.warranty && (
        <div className="text-red-500">{formik.errors.warranty}</div>
      )}

      <input
        type="text"
        placeholder="Protection"
        {...formik.getFieldProps('protection')}
        className="border p-2 rounded w-full mb-2"
      />
      {formik.touched.protection && formik.errors.protection && (
        <div className="text-red-500">{formik.errors.protection}</div>
      )}


      <div>
        <h3 className="text-lg font-medium mb-2">Specifications</h3>
        {formik.values?.specifications?.map((field, index) => (
          <div key={index} className="flex gap-4 mb-3">
            <input
              type="text"
              placeholder="Name"
              value={field.name}
              onChange={(e) => updateSpecification(index, 'name', e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Value"
              value={field.value}
              onChange={(e) => updateSpecification(index, 'value', e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              type="button"
              onClick={() => removeSpecification(index)}
              className="bg-red-500 text-white px-3 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSpecification}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Specification
        </button>
      </div>

      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="border p-2 rounded w-full my-4"
      />

      <input
        type="text"
        placeholder="Brand ID"
        {...formik.getFieldProps('brandId')}
        className="border p-2 rounded w-full mb-2"
      />
      {formik.touched.brandId && formik.errors.brandId && (
        <div className="text-red-500">{formik.errors.brandId}</div>
      )}

      <input
        type="text"
        placeholder="Category ID"
        {...formik.getFieldProps('categoryId')}
        className="border p-2 rounded w-full mb-2"
      />
      {formik.touched.categoryId && formik.errors.categoryId && (
        <div className="text-red-500">{formik.errors.categoryId}</div>
      )}

      <CldUploadWidget
        signatureEndpoint={`${baseURL}/api/signature/signature`}
        onUpload={(result, { widget }) => {
          formik.setFieldValue("images",[...formik.values?.images, result?.info?.secure_url]);
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            open(); // Open the upload widget
          }
          return (
            <button
              type='button'
              onClick={handleOnClick} className="px-5 flex items-center justify-center gap-2 rounded-full border-2 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300">
              <RiImageAddFill />
              Upload
            </button>
          );
        }}
      </CldUploadWidget>


      <div className="grid grid-cols-3 gap-4">
        {formik.values?.images?.map((image, index) => (
          <div key={index} className="border p-2 rounded">

            <Image src={image} width={200} height={200} alt={`Preview ${index}`} className="w-full h-32 object-cover" />
          </div>
        ))}
      </div>



      {/************************* variants  *************************/}

      <div>
        <h3 className="text-lg font-medium mb-2">Variants</h3>
        {formik?.values?.variants?.map((variant, index) => (
          <div key={index} className="mb-4 border p-4 rounded">
            <h4 className="font-medium mb-2">Variant {index + 1}</h4>
            <DynamicFields
              fields={variant.attributes}
              setFields={(fields) => updateVariant(index, 'attributes', fields)}
              title="Attributes"
            />
            <input
              type="number"
              placeholder="Price"
              value={variant.price}
              onChange={(e) => updateVariant(index, 'price', e.target.value)}
              className="border p-2 rounded w-full my-2"
            />
            <input
              type="number"
              placeholder="Stock"
              value={variant.stock}
              onChange={(e) => updateVariant(index, 'stock', e.target.value)}
              className="border p-2 rounded w-full my-2"
            />
            <select
              value={variant.availability}
              onChange={(e) => updateVariant(index, 'availability', e.target.value)}
              className="border p-2 rounded w-full my-2"
            >
              <option value="IN_STOCK">In Stock</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
            </select>

            <div className="mb-2">
              <h5 className="font-medium">Images</h5>
              <CldUploadWidget
                signatureEndpoint={`${baseURL}/api/signature/signature`}
                onUpload={(result) => handleVariantImageUpload(index, result?.info?.secure_url)}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={open}
                    className="px-4 py-2 flex items-center gap-2 rounded-full border bg-gray-100 hover:bg-gray-200"
                  >
                    <RiImageAddFill />
                    Upload Image
                  </button>
                )}
              </CldUploadWidget>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {variant.images.map((image, imgIndex) => (
                <div key={imgIndex} className="relative">
                  <Image
                    src={image}
                    height={200}
                    width={200}
                    alt={`Variant ${index + 1} Image ${imgIndex + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedImages = variant.images.filter((_, i) => i !== imgIndex);
                      updateVariant(index, 'images', updatedImages);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="bg-red-500 text-white px-3 rounded mt-2"
            >
              Remove Variant
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addVariant}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Variant
        </button>
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded mt-5"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
