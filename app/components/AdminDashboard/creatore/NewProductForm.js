import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { RiImageAddFill } from 'react-icons/ri';
import { CldUploadWidget } from 'next-cloudinary';
import baseURL from '@/app/utils/baseURL';
import { createProduct } from '@/app/utils/product/fetch_products_api';
import toast from 'react-hot-toast';
import SearchableSelectField from '../Products/SearchableSelectField';


const ProductForm = ({ mutate, categories, brands }) => {
  const [isLoading, setIsLoading] = useState(false);



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
      )
      .test(
        'unique-names',
        'Specification names must be unique',
        (specs) => {
          const names = specs.map(spec => spec.name);
          return new Set(names).size === names.length;
        }
      ),
    tags: Yup.array()
      .of(
        Yup.string()
          .required('Tag is required')
          .min(1, 'Tag cannot be empty')
          .trim('Tag cannot contain only spaces')
      )
      .min(1, 'At least one tag is required'),
    variants: Yup.array()
      .of(
        Yup.object().shape({
          attributes: Yup.array()
            .of(
              Yup.object().shape({
                name: Yup.string()
                  .required('Attribute name is required')
                  .min(1, 'Attribute name cannot be empty')
                ,
                value: Yup.string()
                  .required('Attribute value is required')
                  .min(1, 'Attribute value cannot be empty')
                ,
              })
            )
            .min(1, 'At least one attribute is required')
          ,
          price: Yup.number()
            .required('Price is required')
            .positive('Price must be positive')
          ,
          stock: Yup.number()
            .required('Stock is required')
            .min(1, 'Stock must be at least 1')
          ,
          availability: Yup.string()
            .required('Availability is required')
          ,
          images: Yup.array()
            .of(Yup.string().url('Invalid image URL'))
            .min(1, 'At least one image is required')
          ,
        })
      )
      .min(1, 'At least one variant is required')
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
    onSubmit: async (values) => {
      console.log("submmit", values);
      setIsLoading(true)

      try {

        const res = await createProduct(values);

        if (res?.status === 201) {

          toast.success("A product post is successfully!", {
            id: "addProduct"
          });
          mutate()
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



  //**********  Specification  **********//

  const addSpecification = () => {
    formik.setFieldValue("specifications", [...formik.values.specifications, { name: '', value: '' }]);

  };


  const removeSpecification = (index) => {
    formik.setFieldValue("specifications", formik.values.specifications.filter((_, i) => i !== index));
  };

  const removeImage = (index) => {
    const updatedImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue('images', updatedImages);
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

  const addAttribute = (variantIndex) => {
    const updatedVariants = [...formik.values.variants];
    updatedVariants[variantIndex].attributes.push({ name: "", value: "" });
    formik.setFieldValue("variants", updatedVariants);
  };
  const removeAttribute = (variantIndex, attrIndex) => {
    const updatedVariants = [...formik.values.variants];
    updatedVariants[variantIndex].attributes = updatedVariants[variantIndex].attributes.filter(
      (_, index) => index !== attrIndex
    );
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
        {formik.values.specifications.map((field, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-center mb-3 py-3 bg-slate-100">
            <div className='col-span-5'>
              {/* Field for Specification Name */}
              <input
                type="text"
                placeholder="Name"
                {...formik.getFieldProps(`specifications[${index}].name`)}
                className="border p-2 rounded w-full"
              />

              {/* Error message for Name */}
              {formik.touched.specifications?.[index]?.name &&
                formik.errors.specifications?.[index]?.name && (
                  <div className="text-red-500">
                    {formik.errors.specifications[index].name}
                  </div>
                )}

            </div>
            <div className='col-span-5'>
              {/* Field for Specification Value */}
              <input
                type="text"
                placeholder="Value"
                {...formik.getFieldProps(`specifications[${index}].value`)}
                className="border p-2 rounded w-full"
              />

              {/* Error message for Value */}
              {formik.touched.specifications?.[index]?.value &&
                formik.errors.specifications?.[index]?.value && (
                  <div className="text-red-500">
                    {formik.errors.specifications[index].value}
                  </div>
                )}
            </div>

            <div className='col-span-2'>
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeSpecification(index)}
                className="bg-red-500 text-white px-3 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {/* Add Specification Button */}
        <button
          type="button"
          onClick={addSpecification}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Specification
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Tags</h3>
        <div className="flex flex-col gap-2">
          {formik.values.tags.map((tag, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 items-center">
              <div className='col-span-5'>
                {/* Input for Tag */}
                <input
                  type="text"
                  placeholder={`Tag ${index + 1}`}
                  {...formik.getFieldProps(`tags[${index}]`)}
                  className="border p-2 rounded w-full"
                />
                <br />
                {/* Error Message for Each Tag */}
                {formik.touched.tags?.[index] && formik.errors.tags?.[index] && (
                  <div className="text-red-500">{formik.errors.tags[index]}</div>
                )}
              </div>
              {/* Remove Button */}
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue(
                    'tags',
                    formik.values.tags.filter((_, i) => i !== index)
                  )
                }
                className="bg-red-500 text-white px-3 rounded className='col-span-1'"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add New Tag Button */}
        <button
          type="button"
          onClick={() => {
            const updatedTags = [...formik.values.tags, ''];
            formik.setFieldValue('tags', updatedTags);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
        >
          Add Tag
        </button>
      </div>

      <div>
        <SearchableSelectField
          label="Category"
          name="categoryId"
          options={categories}
          formik={formik}
        />
      </div>
      <SearchableSelectField
        label="Brand"
        name="brandId"
        options={brands}
        formik={formik}
      />
      {formik.touched.categoryId && formik.errors.categoryId && (
        <div className="text-red-500">{formik.errors.categoryId}</div>
      )}
      <CldUploadWidget
        signatureEndpoint={`${baseURL}/api/signature/signature`}
        onUpload={(result) => {
          console.log(result)
          formik.setFieldValue('images', [...formik.values.images, result.info.secure_url]);
        }}
      >
        {({ open }) => {

          return (
            <button
              type="button"
              onClick={() => open()}
              className="px-4 py-2 flex items-center gap-2 rounded-full border bg-gray-100 hover:bg-gray-200"
            >
              <RiImageAddFill />
              Upload Image
            </button>
          );
        }}
      </CldUploadWidget>


      <div className="flex flex-wrap gap-2 mt-2">
        {formik.values?.images?.map((image, index) => (
          <div key={index} className="relative border rounded">
            <Image src={image} width={200} height={200} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {formik.touched.images && formik.errors.images && (
        <div className="text-red-500">{formik.errors.images}</div>
      )}

      {/************************* variants  *************************/}


      <div>
        <h3 className="text-lg font-medium mb-2">Variants</h3>
        {formik.values.variants.map((variant, index) => (
          <div key={index} className="mb-4 border p-4 rounded">
            <h4 className="font-medium mb-2">Variant {index + 1}</h4>

            {/* Attributes Section */}
            {/* <DynamicFields
              fields={variant.attributes}
              setFields={(fields) => updateVariant(index, 'attributes', fields)}
              title="Attributes"
            /> */}
            <h4 className="font-medium mb-2">Attributes</h4>
            {/* Attributes Section for Each Variant */}
            {formik.values.variants[index].attributes.map((attribute, attrIndex) => (
              <div
                key={attrIndex}
                className="grid grid-cols-12 gap-4 items-center mb-3 py-2 bg-slate-200 rounded"
              >
                <div className="col-span-5">
                  {/* Field for Attribute Name */}
                  <input
                    type="text"
                    placeholder="Attribute Name"
                    {...formik.getFieldProps(
                      `variants[${index}].attributes[${attrIndex}].name`
                    )}
                    className="border p-2 rounded w-full"
                  />
                  {/* Error message for Attribute Name */}
                  {formik.touched.variants?.[index]?.attributes?.[attrIndex]?.name &&
                    formik.errors.variants?.[index]?.attributes?.[attrIndex]?.name && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.variants[index].attributes[attrIndex].name}
                      </div>
                    )}
                </div>

                <div className="col-span-5">
                  {/* Field for Attribute Value */}
                  <input
                    type="text"
                    placeholder="Attribute Value"
                    {...formik.getFieldProps(
                      `variants[${index}].attributes[${attrIndex}].value`
                    )}
                    className="border p-2 rounded w-full"
                  />
                  {/* Error message for Attribute Value */}
                  {formik.touched.variants?.[index]?.attributes?.[attrIndex]?.value &&
                    formik.errors.variants?.[index]?.attributes?.[attrIndex]?.value && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.variants[index].attributes[attrIndex].value}
                      </div>
                    )}
                </div>

                <div className="col-span-2">
                  {/* Remove Attribute Button */}
                  <button
                    type="button"
                    onClick={() => removeAttribute(index, attrIndex)}
                    className="bg-red-500 text-white px-3 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Add Attribute Button for Each Variant */}
            <button
              type="button"
              onClick={() => addAttribute(index)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Attribute
            </button>

            {/* Price Input */}
            <input
              type="number"
              placeholder="Price"
              {...formik.getFieldProps(`variants[${index}].price`)}
              className="border p-2 rounded w-full my-2"
            />
            {formik.touched.variants?.[index]?.price &&
              formik.errors.variants?.[index]?.price && (
                <div className="text-red-500">{formik.errors.variants[index].price}</div>
              )}

            {/* Stock Input */}
            <input
              type="number"
              placeholder="Stock"
              {...formik.getFieldProps(`variants[${index}].stock`)}
              className="border p-2 rounded w-full my-2"
            />
            {formik.touched.variants?.[index]?.stock &&
              formik.errors.variants?.[index]?.stock && (
                <div className="text-red-500">{formik.errors.variants[index].stock}</div>
              )}

            {/* Availability Dropdown */}
            <select
              {...formik.getFieldProps(`variants[${index}].availability`)}
              className="border p-2 rounded w-full my-2"
            >
              <option value="IN_STOCK">In Stock</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
            </select>
            {formik.touched.variants?.[index]?.availability &&
              formik.errors.variants?.[index]?.availability && (
                <div className="text-red-500">
                  {formik.errors.variants[index].availability}
                </div>
              )}

            {/* Variant Images */}
            <div className="mb-2">
              <h5 className="font-medium">Images</h5>


              <CldUploadWidget
                signatureEndpoint={`${baseURL}/api/signature/signature`}
                onUpload={(result) => {
                  console.log(result.info.secure_url)
                  handleVariantImageUpload(index, result.info.secure_url)
                }}
              >
                {({ open }) => {

                  return (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="px-4 py-2 flex items-center gap-2 rounded-full border bg-gray-100 hover:bg-gray-200"
                    >
                      <RiImageAddFill />
                      Upload Image
                    </button>
                  );
                }}
              </CldUploadWidget>
            </div>

            {/* Display Uploaded Images */}
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
                      const updatedImages = variant.images.filter(
                        (_, i) => i !== imgIndex
                      );
                      updateVariant(index, 'images', updatedImages);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {/* Error Message for Images */}
            {formik.touched.variants?.[index]?.images &&
              formik.errors.variants?.[index]?.images && (
                <div className="text-red-500">{formik.errors.variants[index].images}</div>
              )}

            {/* Remove Variant Button */}
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="bg-red-500 text-white px-3 rounded mt-2"
            >
              Remove Variant
            </button>
          </div>
        ))}

        {/* Add Variant Button */}
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
        disabled={isLoading}
        className={`bg-green-500 text-white px-4 py-2 rounded mt-5 ${isLoading && "opacity-50"}`}
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
