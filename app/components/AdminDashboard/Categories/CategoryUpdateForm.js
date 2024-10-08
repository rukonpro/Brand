import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import FileUploader from '../FileUploader/FileUploader';

const CategoryUpdateForm = ({ handleUpdateCategory, category }) => {
  const [photoUrl, setPhotoUrl] = useState(category?.photo || '');

  // Yup schema for validation
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    description: Yup.string()
      .min(10, 'Description should be at least 10 characters long')
      .required('Description is required'),
    photo: Yup.string().required('Please upload a photo'),
  });

  // Formik hook setup
  const formik = useFormik({
    initialValues: {
      name: category?.name || '',
      description: category?.description || '',
      photo: category?.photo || '', // Ensure this field is updated
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await handleUpdateCategory({ values, resetForm });
    },
    enableReinitialize: true, // Allow form to update when initialData changes
  });

  // Update photoUrl when initialData changes
//   useEffect(() => {
//     if (initialData?.photo) {
//       setPhotoUrl(initialData.photo);
//       formik.setFieldValue('photo', initialData.photo);
//     }
//   }, [initialData]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">
        {'Update Category'}
      </h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          ) : null}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            rows="4"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
          ) : null}
        </div>

        {/* File Uploader for Photo */}
        <div className="mb-4">
          <FileUploader
            setPhotoUrl={(url) => {
              formik.setFieldValue('photo', url); // Update formik value for photo
              setPhotoUrl(url);
            }}
            photoUrl={photoUrl}
            formik={formik}
          />
          {formik.touched.photo && formik.errors.photo ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.photo}</p>
          ) : null}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {formik.isSubmitting ? 'Submitting...' :  'Update Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryUpdateForm;
