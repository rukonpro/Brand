"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper CSS ফাইল ইম্পোর্ট করুন
import 'swiper/css/navigation'; // Navigation বাটন স্টাইল
import 'swiper/css/pagination';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';


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

            <div className='pt-5'>
                <Swiper
                   
                    spaceBetween={20} // স্লাইডের মধ্যে ফাঁকা জায়গা (পিক্সেলে)
                    slidesPerView={3} // একসাথে কতটি স্লাইড দেখানো হবে
                 
                   
                    breakpoints={{
                        640: {
                            slidesPerView: 4, // মোবাইলে ১টি স্লাইড দেখাবে
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 4, // ট্যাবলেটে ২টি স্লাইড দেখাবে
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 5, // ডেস্কটপে ৩টি স্লাইড দেখাবে
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.images?.length > 0 && product?.images?.map((image, index) => {
                        return (
                            <SwiperSlide key={index}>
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
                            </SwiperSlide>
                        )
                    })
                    }

                </Swiper>
            </div>

        </div>
    );
};

export default ImageChangeButton;