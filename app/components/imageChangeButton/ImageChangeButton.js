"use client"
import React, { useState } from 'react';
import Image from 'next/image';
const ImageChangeButton = ({ images, name }) => {

    const [changeImage, setChnageImage] = useState(images?.[0])

    return (
        <div>
            <div className="p-3 bg-white border-2 rounded flex justify-center dark:bg-slate-700 dark:border-slate-700">

                <Image
                    src={changeImage}
                    width={400}
                    height={400}
                    blurDataURL={changeImage}
                    placeholder="blur"
                    loading='lazy'
                    alt={name}
                    className="h-80 w-auto object-contain"
                />

            </div>
            <ol className="pt-3 flex gap-2 justify-center max-w-[600px] overflow-x-auto overflow-hidden ">
                {images?.map((image, index) => {
                    return (
                        <li key={index}>
                            <button onMouseOver={() => setChnageImage(image)}
                                onClick={() => setChnageImage(image)}

                                className="w-[56px] h-[56px] border-2 rounded p-1 dark:border-slate-700">
                                <Image
                                    src={image}
                                    height={50}
                                    width={50}
                                    loading="lazy"
                                    alt={name}
                                    blurDataURL={changeImage}
                                    placeholder={"blur"}
                                    className='h-full w-full object-contain' />
                            </button>
                        </li>
                    )
                })}
            </ol>
        </div>
    );
};

export default ImageChangeButton;