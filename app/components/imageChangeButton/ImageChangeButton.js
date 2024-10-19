"use client"
import React, { useState } from 'react';
import Image from 'next/image';
const ImageChangeButton = ({ product }) => {

    const [changeImage, setChnageImage] = useState(product?.coverPhoto)

    return (
        <div>
            <div className="p-3 bg-white border-2 rounded flex justify-center dark:bg-slate-700 dark:border-slate-700">

                {changeImage && <Image
                    src={changeImage}
                    width={400}
                    height={400}
                    blurDataURL={changeImage}
                    placeholder="blur"
                    loading='lazy'
                    alt={product?.name}
                    className="h-80 w-auto object-contain"
                />}

            </div>
            <ol className="pt-3 flex gap-2 justify-center max-w-[600px] overflow-x-auto overflow-hidden ">


                {product?.variants?.length > 0 ? product?.variants?.map((variant) => {
                    return (
                        <li key={variant?.id}>
                            <button onMouseOver={() => setChnageImage(variant?.image)}
                                onClick={() => setChnageImage(variant?.image)}

                                className="w-[56px] h-[56px] border-2 rounded p-1 dark:border-slate-700">
                                <Image
                                    src={variant?.image}
                                    height={50}
                                    width={50}
                                    loading="lazy"
                                    alt={product?.name}
                                    blurDataURL={changeImage}
                                    placeholder={"blur"}
                                    className='h-full w-full object-contain' />
                            </button>
                        </li>
                    )
                }) :

                    <li key={product?.id}>
                        <button onMouseOver={() => setChnageImage(product.coverPhoto)}
                            onClick={() => setChnageImage(product.coverPhoto)}

                            className="w-[56px] h-[56px] border-2 rounded p-1 dark:border-slate-700">
                            <Image
                                src={product.coverPhoto}
                                height={50}
                                width={50}
                                loading="lazy"
                                alt={product?.name}
                                blurDataURL={product.coverPhoto}
                                placeholder={"blur"}
                                className='h-full w-full object-contain' />
                        </button>
                    </li>
                }
            </ol>
        </div>
    );
};

export default ImageChangeButton;