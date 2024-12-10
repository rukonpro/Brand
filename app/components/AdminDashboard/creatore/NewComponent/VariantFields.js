import React, { useState } from 'react';
import DynamicFields from './DynamicFields';
import ImageUploadWidget from './ImageUploadWidget';

const VariantFields = ({ variants, setVariants }) => {
    const [images, setImages] = useState([]);
  const addVariant = () => {
    setVariants([...variants, { attributes: [], price: '', stock: '', availability: 'IN_STOCK', images: images }]);
  };

  const updateVariant = (index, key, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][key] = value;
    setVariants(updatedVariants);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

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
          <ImageUploadWidget images={images} setImages={setImages} />
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
