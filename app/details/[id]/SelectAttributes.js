"use client";
import { GrAdd, GrFormSubtract } from "react-icons/gr";
import { useCart } from "@/app/context/CartContext";
import { useEffect } from "react";


export default function SelectAttributes({ product, id }) {


  const {
    loading,
    addToCart,
    selectedAttributes,
    setSelectedAttributes,
    quantity,
    setQuantity,
    setImageChange,
    setSelectVariant,
  } = useCart();

  // Handle attribute selection
  const handleAttributeChange = (attributeName, value) => {
    if (selectedAttributes[attributeName] === value) {
      // If the value is already selected, remove it (unselect)
      const newAttributes = { ...selectedAttributes };
      delete newAttributes[attributeName];
      setSelectedAttributes(newAttributes);
    } else {
      // Otherwise, set the selected value
      setSelectedAttributes({
        ...selectedAttributes,
        [attributeName]: value,
      });
    }
  };

  // Function to get matching variants based on selected attributes
  const getMatchingVariants = (attributeName, selectedValue) => {
    const currentSelectedAttributes = { ...selectedAttributes, [attributeName]: selectedValue };

    return product?.variants?.filter((variant) =>
      Object.keys(currentSelectedAttributes).every((attr) =>
        variant.attributes.some(
          (attribute) =>
            attribute.name === attr &&
            attribute.value === currentSelectedAttributes[attr]
        )
      )
    );
  };

  // Find the currently selected variant based on selected attributes
  const matchingVariant = product?.variants?.find((variant) => {
    return Object.keys(selectedAttributes).every((attr) =>
      variant.attributes.some(
        (attribute) =>
          attribute?.name === attr && attribute?.value === selectedAttributes[attr]
      )
    );
  });

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 1 || e.target.value === "") {
      setQuantity(value);
    }
  };

  const increment = () => {
    if (matchingVariant?.stock > quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  useEffect(() => {
    setSelectedAttributes({});
    setSelectVariant({});
    setQuantity(1);
  }, [setSelectedAttributes, setSelectVariant, setQuantity, id]);

  useEffect(() => {
    setImageChange(matchingVariant?.images?.[0] || product?.images?.[0]);
    setSelectVariant(matchingVariant)
  }, [matchingVariant?.images, setImageChange, product?.images, matchingVariant, setSelectVariant]);


  return (
        <div>
          {/* Dynamic Attribute Selection */}
          {product?.variants?.length > 0 &&
            [...new Set(product?.variants?.flatMap((variant) => variant?.attributes?.map((attr) => attr.name)))].map((attribute, index) => (
              <div className="mt-6 grid grid-cols-12" key={index}>
                <h2 className=" col-span-4">Select {attribute}:</h2>
                <div className="flex gap-2  col-span-8 flex-wrap">
                  {[...new Set(
                    product?.variants
                      ?.map((variant) =>
                        variant?.attributes?.find((attr) => attr?.name === attribute)?.value
                      )
                      .filter(Boolean)
                  )].map((option, idx) => {
                    const isSelected = selectedAttributes[attribute] === option;
                    const matchingVariants = getMatchingVariants(attribute, option);

                    return option && (
                      <button
                        key={idx}
                        onClick={() => handleAttributeChange(attribute, option)}
                        className={`px-4 py-2 border-2 rounded-md ${isSelected ? 'border-blue-500' : 'border-blue-200'
                          } 
                        ${matchingVariants?.length === 0 ? 'opacity-20 cursor-not-allowed' : ''}
                        `}
                        disabled={matchingVariants?.length === 0}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

          {/* Quantity Selection */}
          <div className="mt-6 grid grid-cols-12">
            <h2 className="col-span-4">Quantity:</h2>
            <div className="flex items-center space-x-2"> {/* Flex container for alignment */}
              <button
                onClick={decrement}
                disabled={quantity <= 1}
                className={`px-2 py-1 border-2 border-blue-200  rounded-md bg-transparent hover:border-blue-500 text-blue-500 font-bold ${quantity <= 1 ? "opacity-20" : ""}`}
              >
                <GrFormSubtract size={20} />
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={handleChange}
                className="w-16 px-2 py-1 border-2 text-center text-blue-500 font-bold bg-inherit appearance-none border-blue-200 rounded-md  hover:border-blue-500"
                style={{ appearance: 'none', MozAppearance: 'textfield' }}
              />
              <button
                onClick={increment}
                disabled={matchingVariant?.stock <= quantity}
                className={`px-2 py-1 border-2 border-blue-200 rounded-md bg-transparent hover:border-blue-500 text-blue-500 font-bold ${matchingVariant?.stock <= quantity ? "opacity-20" : ""}`}
              >
                <GrAdd size={20} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-8">
            <button
              onClick={() => addToCart({ matchingVariant, product })}
              disabled={loading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-bold ${loading ? "opacity-20" : ""}`}
            >
              Add to Cart
            </button>
          </div>
        </div> 
  );
}


// const product = {
//   "id":"1",
//   "name": "I-phone",
//   "description": "ddss",
//   "basePrice": 500,
//   "brandId": "sdfsdf",
//   "categoryId": "dsfdsf",
//   "warranty": "sdfsd",
//   "protection": "dsfdsf",
//   "images": [
//     "https://res.cloudinary.com/dtncxgdrh/image/upload/v1733326769/brand/po4saaooaflpjpfqgqtl.webp"
//   ],
//   "variants": [
//     {
//       "attributes": [
//         {
//           "name": "size",
//           "value": "M"
//         },
//         {
//           "name": "material",
//           "value": "cotton"
//         }
//       ],
//       "price": 500,
//       "stock": 100,
//       "availability": "IN_STOCK",
//       "images": [
//         "https://res.cloudinary.com/dtncxgdrh/image/upload/v1733326769/brand/po4saaooaflpjpfqgqtl.webp"
//       ]
//     }
//   ],
//   "specifications": [
//     {
//       "name": "sdfds",
//       "value": "dsfd"
//     }
//   ],
//   "tags": [
//     "sdfds"
//   ]
// }