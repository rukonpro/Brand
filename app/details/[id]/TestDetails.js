"use client"
import Image from 'next/image';
import { useState } from 'react';

export default function ProductDetails() {
  const product = products[2];
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [quantity, setQuantity] = useState(1);

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

    return product.variants.filter(variant =>
      Object.keys(currentSelectedAttributes).every(attr =>
        variant.attributes[attr] === currentSelectedAttributes[attr]
      )
    );
  };

  // Add to Cart Logic
 // Add to Cart Logic
const addToCart = () => {
  // Find the currently selected variant based on selected attributes
  const matchingVariant = product.variants.find(variant => {
    return Object.keys(selectedAttributes).every(attr => {
      return variant.attributes[attr] === selectedAttributes[attr];
    });
  });

  if (matchingVariant) {
    // Check for unselected attributes specific to the selected variant
    const unselectedAttributes = Object.keys(matchingVariant.attributes).filter(attr => !selectedAttributes[attr]);

    if (unselectedAttributes.length > 0) {
      alert(`Please select the following attributes for the selected variant: ${unselectedAttributes.join(', ')}`);
      console.log(`Missing attributes for variant ${matchingVariant.variantId}: ${unselectedAttributes.join(', ')}`);
      return;
    }

    const cartItem = {
      productId: product.id,
      variantId: matchingVariant.variantId,
      name: product.name,
      price: matchingVariant.price,
      quantity,
      selectedAttributes,
    };
    // Add the cart item (store it in context, state, or localStorage)
    alert('Added to cart:', cartItem);

    console.log('Added to cart:', cartItem);
  } else {
    alert('No matching variant found');
    console.log('No matching variant found');
  }
};


  return (
    <div>
      <div>
     
        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-xl font-semibold mt-4">BDT {product.price}</p>

          {/* Dynamic Attribute Selection */}
          {Object.keys(product.variants[0].attributes).map((attribute, index) => (
            <div className="mt-6 grid grid-cols-12" key={index}>
              <h2 className="text-lg font-semibold col-span-4">Select {attribute}:</h2>
              <div className="flex space-x-2 mt-2 col-span-8">
                {[...new Set(product.variants.map(variant => variant.attributes[attribute]))].map((option, idx) => {
                  const isSelected = selectedAttributes[attribute] === option;
                  const matchingVariants = getMatchingVariants(attribute, option);

                  return option && (
                    <button
                      key={idx}
                      onClick={() => handleAttributeChange(attribute, option)}
                      className={`px-4 py-2 border-2 rounded-md ${isSelected ? 'border-blue-500' : 'border-blue-200'
                        } 
                        ${matchingVariants.length === 0 ? 'opacity-20 cursor-not-allowed' : ''}
                        `}
                      disabled={matchingVariants.length === 0}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantity Selection */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Quantity:</h2>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className="w-16 px-2 py-1 border rounded-md"
            />
          </div>

          {/* Add to Cart Button */}
          <div className="mt-8">
            <button
              onClick={addToCart}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const products = [
  {
    id: '1',
    name: 'Stylish Shirt',
    description: 'A stylish shirt made from premium materials, perfect for casual wear.',
    price: 1200,
    images: [
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
    ],
    variants: [
      {
        variantId: '1a',
        attributes: { color: 'Red', size: 'S' },
        price: 1200,
        stock: 10,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      },
      {
        variantId: '1b',
        attributes: { color: 'Red', size: 'M' },
        price: 1200,
        stock: 5,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      },
      {
        variantId: '1c',
        attributes: { color: 'Blue', size: 'L' },
        price: 1200,
        stock: 8,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      },
      {
        variantId: '1d',
        attributes: { color: 'Green', size: 'XL' },
        price: 1200,
        stock: 0,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Casual T-Shirt',
    description: 'A comfortable and trendy t-shirt for daily use.',
    price: 800,
    images: [
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
    ],
    variants: [
      {
        variantId: '2a',
        attributes: { color: 'Black', size: 'M' },
        price: 800,
        stock: 15,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      },
      {
        variantId: '2b',
        attributes: { color: 'White', size: 'L' },
        price: 800,
        stock: 12,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Formal Pant',
    description: 'Premium quality formal pant, perfect for office wear.',
    price: 1500,
    images: [
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
    ],
    variants: [
      {
        variantId: '3a',
        attributes: { color: 'Grey', size: '32' },
        price: 1500,
        stock: 20,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      },
      {
        variantId: '3b',
        attributes: { color: 'Black', size: '34' },
        price: 1500,
        stock: 10,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for everyday use.',
    price: 2500,
    images: [
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
    ],
    variants: [
      {
        variantId: '4a',
        attributes: { color: 'Blue', size: '8' },
        price: 2500,
        stock: 30,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      },
      {
        variantId: '4b',
        attributes: { color: 'White', size: '9' },
        price: 2500,
        stock: 25,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      }
    ]
  },
  {
    id: '5',
    name: 'Winter Jacket',
    description: 'Stay warm and stylish with this premium winter jacket.',
    price: 3500,
    images: [
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
    ],
    variants: [
      {
        variantId: '5a',
        attributes: { color: 'Black', size: 'M' },
        price: 3500,
        stock: 5,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      },
      {
        variantId: '5b',
        attributes: { color: 'Grey', size: 'L' },
        price: 3500,
        stock: 10,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Sports Watch',
    description: 'A modern sports watch with multiple fitness features.',
    price: 5000,
    images: [
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
    ],
    variants: [
      {
        variantId: '6a',
        attributes: { color: 'Black', strap: 'Leather', size: "Lerge" },
        price: 5000,
        stock: 50,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      },
      {
        variantId: '6b',
        attributes: { color: 'Silver', strap: 'Metal' },
        price: 5000,
        stock: 20,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      }
    ]
  },
  {
    id: '7',
    name: 'Leather Wallet',
    description: 'A classic leather wallet with multiple card slots.',
    price: 1500,
    images: [
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
    ],
    variants: [
      {
        variantId: '7a',
        attributes: { color: 'Brown', material: 'Leather' },
        price: 1500,
        stock: 100,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      },
      {
        variantId: '7b',
        attributes: { color: 'Black', material: 'Leather' },
        price: 1500,
        stock: 80,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      }
    ]
  },
  {
    id: '8',
    name: 'Backpack',
    description: 'Spacious and stylish backpack for school or travel.',
    price: 2000,
    images: [
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
    ],
    variants: [
      {
        variantId: '8a',
        attributes: { color: 'Blue', size: 'Large' },
        price: 2000,
        stock: 15,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      },
      {
        variantId: '8b',
        attributes: { color: 'Black', size: 'Medium' },
        price: 2000,
        stock: 10,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      }
    ]
  },
  {
    id: '9',
    name: 'Bluetooth Headphones',
    description: 'Wireless headphones with high sound quality.',
    price: 3000,
    images: [
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
    ],
    variants: [
      {
        variantId: '9a',
        attributes: { color: 'Black', type: 'Over-ear' },
        price: 3000,
        stock: 40,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      },
      {
        variantId: '9b',
        attributes: { color: 'White', type: 'On-ear' },
        price: 3000,
        stock: 30,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      }
    ]
  },
  {
    id: '10',
    name: 'Smartphone Stand',
    description: 'Adjustable stand for smartphones and tablets.',
    price: 500,
    images: [
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
      'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
    ],
    variants: [
      {
        variantId: '10a',
        attributes: { color: 'White', material: 'Plastic' },
        price: 500,
        stock: 200,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      },
      {
        variantId: '10b',
        attributes: { color: 'Black', material: 'Metal' },
        price: 500,
        stock: 150,
        images: [
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg',
          'https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Plus-(2)-7161.jpg'
        ]
      }
    ]
  }
];
