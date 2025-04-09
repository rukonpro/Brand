"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

const BannerSlider = ({ banners }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const autoSlideRef = useRef(null);


    // GSAP Animation for fade transition
    const fadeAnimation = (direction) => {
        const slides = sliderRef.current.children;
        const current = slides[currentSlide];
        const nextIndex =
            direction === "next"
                ? (currentSlide + 1) % banners?.length
                : (currentSlide - 1 + banners?.length) % banners?.length;
        const next = slides[nextIndex];

        gsap.timeline()
            .to(current, { opacity: 0, duration: 0.5 })
            .fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.5")
            .call(() => setCurrentSlide(nextIndex));
    };

    // Handle Next Slide
    const nextSlide = () => {
        fadeAnimation("next");
        resetAutoSlide();
    };

    // Handle Previous Slide
    const prevSlide = () => {
        fadeAnimation("prev");
        resetAutoSlide();
    };

    // Auto Slide every 5 seconds
    let startAutoSlide = () => {
        autoSlideRef.current = setInterval(() => {
            nextSlide();
        }, 5000);
    };

    // Reset auto slide timer
    const resetAutoSlide = () => {
        clearInterval(autoSlideRef.current);
        startAutoSlide();
    };



    // Start auto slide on mount and cleanup on unmount
    useEffect(() => {
        startAutoSlide();
        return () => clearInterval(autoSlideRef.current);
    }, [startAutoSlide]);

    return (
        <div
            className="relative w-full h-60 md:h-96 overflow-hidden"
        >
            {/* Slider Container */}
            <div ref={sliderRef}>
                {banners?.map((banner, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
                            currentSlide === index ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Image
                            src={banner?.image}
                            alt={banner?.title}
                            fill
                            sizes="100%"
                            priority={index === currentSlide}
                            className="object-cover"
                        />
                        <div className="absolute top-2 left-5 text-slate-700 font-bold ">
                           <div className=" backdrop-blur">
                               <h1 className="text-xl py-0 text-stone-100  rounded-2xl">
                                   {banner?.title}
                               </h1>
                           </div>
                            <br />
                            <Link
                                href={banner?.link}
                                aria-label={banner?.title}
                                className="bg-white rounded-xl px-2 py-1  inline-block text-sm"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute top-1/2 left-4 w-10 transform -translate-y-1/2 bg-blue-500 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                onClick={prevSlide}
            >
                ❮
            </button>
            <button
                className="absolute top-1/2 right-4 w-10 transform -translate-y-1/2 bg-blue-500 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
                onClick={nextSlide}
            >
                ❯
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners?.map((_, index) => {
                    return(
                        <span
                            key={index}
                            className={`h-4 w-4 rounded-full cursor-pointer transition-colors duration-300 ${
                                currentSlide === index ? "bg-blue-500" : "bg-blue-200"
                            }`}
                            onClick={() => {
                                setCurrentSlide(index);
                                resetAutoSlide();
                            }}
                        ></span>
                    )
                })}
            </div>
        </div>
    );
};

export default BannerSlider;
