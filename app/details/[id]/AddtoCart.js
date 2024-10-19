"use client"
import AddToCartButton from '@/app/components/AddToCartButton/AddToCartButton';
import Image from 'next/image';
import React, { useState } from 'react'

function AddtoCart({ product }) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    // attribute select করার হ্যান্ডলার
    const handleAttributeSelect = (variant) => {
        setSelectedVariant(variant);
        setSelectedOption(null); // নতুন ভেরিয়েন্ট সিলেক্ট করলে অপশন রিসেট করে দাও
    };

    // option select করার হ্যান্ডলার
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    // Add to cart এ ক্লিক করার হ্যান্ডলার
    const handleAddToCart = () => {
        if (!selectedVariant || !selectedOption) {
            alert('Please select both variant and option before adding to cart.');
            return;
        }

        const cartItem = {
            variantId: selectedVariant.id,
            productId: selectedVariant.productId,
            attributes: selectedVariant.attributes,
            selectedOption: selectedOption,
            quantity: 1,
        };

        console.log('Adding to cart:', cartItem);
        // এখানে লোকাল স্টোরেজ বা API কল করা যাবে
    };


    return (
        <div>
            {/* Variant attributes সিলেক্ট */}
            <div>
                <h3>Select Attributes:
                    {selectedVariant && Object.keys(selectedVariant?.attributes)?.map((key) => (
                        <span key={key}>
                            {selectedVariant?.attributes[key]}{' '}
                        </span>
                    ))}

                    <span>
                        {selectedOption && Object.keys(selectedOption.attributes).map((key) => (


                            <span key={key} className='capitalize'>
                                {selectedOption.attributes[key]}{' '}

                            </span>

                        ))
                        }
                        {selectedOption && <span>${selectedOption?.price}</span>}
                    </span>

                </h3>

                {product?.variants.map((variant) => (
                    <button
                        key={variant.id}
                        onClick={() => handleAttributeSelect(variant)}
                        className={`border-2 m-2 rounded-lg ${selectedVariant?.id === variant.id ? ' border-blue-500 text-white' : ''
                            }`}
                    >
                        {/* {Object.keys(variant.attributes).map((key) => (
                            <span key={key}>
                                {variant.attributes[key]}{' '}
                            </span>
                        ))} */}

                        <div className='p-2'>
                            <Image src={variant?.image} height={50} width={50} alt={variant?.color}
                                className='w-full object-contain rounded-lg'
                            />
                        </div>
                    </button>
                ))}
            </div>

            {/* Variant options সিলেক্ট */}
            {selectedVariant && (
                <div>
                    <h3>Select Option:</h3>
                    {selectedVariant?.options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleOptionSelect(option)}
                            disabled={!option?.stock}
                            className={`border-2 px-4 py-2 m-2 border-blue-200 rounded-lg ${selectedOption?.id === option.id ? ' border-blue-400  text-blue-500 ' : ''
                                }`}
                        >
                            {Object.keys(option.attributes).map((key) => (
                                <span key={key} className='capitalize'>
                                    {key}: {option.attributes[key]}{' '}
                                </span>
                            ))}
                            <span>Price: ${option.price}</span>
                        </button>
                    ))}
                </div>
            )}

            <div className="flex justify-end max-w-72">

                <AddToCartButton product={product?.data} />

            </div>
            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                className="border-2 border-blue-400  text-blue-500 px-3 py-1 m-2 rounded-lg"
            >
                Add to Cart
            </button>
        </div>
    )
}

export default AddtoCart
