"use client"
import React, { useState } from 'react';
import Image from 'next/image';
const ImageChangeButton = ({ images, name }) => {

    const [changeImage, setChnageImage] = useState(images?.[0])

    return (
        <div>
            <div className="p-3 bg-white border-2 rounded flex justify-center">
                <Image
                    src={changeImage}
                    width={400}
                    height={400}
                    blurDataURL={changeImage}
                    placeholder={"blur"}
                    loading='lazy'
                    alt={name}
                    className='h-full w-full object-cover' />
            </div>
            <ol className="pt-3 flex gap-2 justify-center">
                {images?.map((image, index) => {
                    return (
                        <li key={index}>
                            <button onClick={() => setChnageImage(image)} className="w-[56px] h-[56px] border-2 rounded p-1">
                                <Image
                                    src={image}
                                    height={50}
                                    width={50}
                                    loading="lazy"
                                    alt={name}
                                    blurDataURL={changeImage}
                                    placeholder={"blur"}
                                    className='h-full w-full object-cover' />
                            </button>
                        </li>
                    )
                })}
            </ol>
        </div>
    );
};

export default ImageChangeButton;