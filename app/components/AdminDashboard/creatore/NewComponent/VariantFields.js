import React from 'react';
import DynamicFields from './DynamicFields';
import { CldUploadWidget } from 'next-cloudinary';
import { RiImageAddFill } from 'react-icons/ri';
import Image from 'next/image';
import baseURL from '@/app/utils/baseURL';

const VariantFields = ({ variants, setVariants }) => {

  const addVariant = () => {
    setVariants([...variants, { attributes: [], price: '', stock: '', availability: 'IN_STOCK', images: [] }]);
  };

  const updateVariant = (index, key, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][key] = value;
    setVariants(updatedVariants);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };



  const handleImageUpload = (index, url) => {
    const updatedVariants = [...variants];
    updatedVariants[index].images = [...updatedVariants[index].images, url];
    setVariants(updatedVariants);
  };

  // signatureEndpoint={`${baseURL}/api/signature/signature`}
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Variants</h3>
      {variants.map((variant, index) => (
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
              onUpload={(result) => handleImageUpload(index, result?.info?.secure_url)}
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
  );
};

export default VariantFields;
