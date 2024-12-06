"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
const ImageChangeButton = ({ product }) => {
    const { imageChange, setImageChange } = useCart()





    return (
        <div>
            <div className="p-3 bg-white border-2 rounded flex justify-center dark:bg-slate-700 dark:border-slate-700">

                {imageChange && <Image
                    src={imageChange}
                    width={400}
                    height={400}
                    blurDataURL={imageChange}
                    placeholder="blur"
                    loading='lazy'
                    alt={product?.name}
                    className="h-80 w-auto object-contain"
                />}

            </div>
            <ol className="pt-3 flex gap-2 justify-center max-w-[600px] overflow-x-auto overflow-hidden ">


                {product?.images?.length > 0 && product?.images?.map((image, index) => {
                    return (
                        <li key={index}>
                            <button onMouseOver={() => setImageChange(image)}
                                onClick={() => setImageChange(image)}

                                className="w-[56px] h-[56px] border-2 rounded p-1 dark:border-slate-700">
                                <Image
                                    src={image}
                                    height={50}
                                    width={50}
                                    loading="lazy"
                                    alt={product?.name}
                                    blurDataURL={image}
                                    placeholder={"blur"}
                                    className='h-full w-full object-contain' />
                            </button>
                        </li>
                    )
                })
                }
            </ol>
        </div>
    );
};

export default ImageChangeButton;