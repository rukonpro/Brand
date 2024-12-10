import React, { useState } from 'react';
import { useFormik } from 'formik';
import DynamicFields from './NewComponent/DynamicFields';
import VariantFields from './NewComponent/VariantFields';
import ImageUploadWidget from './NewComponent/ImageUploadWidget';

const ProductForm = () => {
  const [specifications, setSpecifications] = useState([]);
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);
  
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      basePrice: '',
      brandId: '',
      categoryId: '',
    },
    onSubmit: (values) => {
      console.log({
        ...values,
        specifications,
        tags: tags.split(','),
        images,
        variants,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>
      <input
        type="text"
        placeholder="Name"
        {...formik.getFieldProps('name')}
        className="border p-2 rounded w-full mb-4"
      />
      <textarea
        placeholder="Description"
        {...formik.getFieldProps('description')}
        className="border p-2 rounded w-full mb-4"
      />
      <input
        type="number"
        placeholder="Base Price"
        {...formik.getFieldProps('basePrice')}
        className="border p-2 rounded w-full mb-4"
      />
      <DynamicFields fields={specifications} setFields={setSpecifications} title="Specifications" />
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
        className="border p-2 rounded w-full mb-4"
      />
      <input
        type="text"
        placeholder="Category ID"
        {...formik.getFieldProps('categoryId')}
        className="border p-2 rounded w-full mb-4"
      />
     <ImageUploadWidget images={images} setImages={setImages} />
      <VariantFields variants={variants} setVariants={setVariants} />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
