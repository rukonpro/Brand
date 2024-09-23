"use client"
import { useState, useEffect } from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";


const BannerSlider = ({banners}) => {

    const [currentSlide, setCurrentSlide] = useState(0);


    const slideCount = banners?.length;

    const router = useRouter();
    // Auto-slide after every 3 seconds
    useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(slideInterval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => ( prev === slideCount - 1 ? 0 : prev + 1))
    };
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
    };


    return (
        <div className="relative w-full h-96 overflow-hidden">
            {banners?.map((banner,index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url(${banner?.image})` }}
                >
                    <div className="absolute top-10 left-5 text-slate-700  font-bold  w-60 ">
                        <h1 className="text-xl  p-0 backdrop-blur"><span className="">{banner?.title}</span></h1>
                        {banner?.link&&
                            <Link href={banner?.link+slideCount} prefetch>   <button
                                type='button' className="bg-white rounded-xl px-4 py-2 mt-5">
                                Learn more
                            </button>
                            </Link>
                        }
                    </div>
                </div>
            ))}

            <button
                className="absolute top-1/2 left-4 w-10 transform -translate-y-1/2 bg-blue-500 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                onClick={prevSlide}
            >
                &#10094;
            </button>
            <button
                className="absolute top-1/2 right-4 w-10 transform -translate-y-1/2 bg-blue-500 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                onClick={nextSlide}
            >
                &#10095;
            </button>

            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners?.map((_, index) => (
                    <span
                        key={index}
                        className={`h-4 w-4 rounded-full cursor-pointer transition-colors duration-300 ${currentSlide === index ? 'bg-blue-500' : 'bg-blue-200'}`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;
