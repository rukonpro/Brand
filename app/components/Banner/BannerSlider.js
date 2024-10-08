"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";

const BannerSlider = ({ banners }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [link, setLink] = useState(banners?.[0]?.link);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [moveX, setMoveX] = useState(0);

    const slideCount = banners?.length;

    useEffect(() => {
        setLink(banners?.[currentSlide]?.link); // Set the current banner's link
    }, [currentSlide]);

    // Auto-slide after every 3 seconds
    useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(slideInterval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
    };

    const handleMouseDown = (e) => {
        e.preventDefault(); // Prevent default behavior like selecting text or image
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent default behavior while dragging
        setMoveX(e.clientX - startX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);

        if (moveX > 50) {
            // Swipe right (previous slide)
            prevSlide();
        } else if (moveX < -50) {
            // Swipe left (next slide)
            nextSlide();
        }

        setMoveX(0); // Reset the movement state after sliding
    };

    const handleMouseLeave = () => {
        setIsDragging(false); // Stop dragging when the mouse leaves the banner
    };

    return (
        <div
            className="relative w-full h-60 md:h-96 overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave} // To stop dragging if the mouse leaves the slider
            style={{ userSelect: "none",  }} // Prevent text selection and change cursor
        >
            {banners?.map((banner, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                >
                    {/* Next.js Image for optimization */}
                    <Image
                        src={banner?.image}
                        alt={banner?.title}
                        fill
                        className="object-cover"
                        priority={index === currentSlide} // Give priority to current image
                    />
                    <div className="absolute top-10 left-5 text-slate-700 font-bold w-60">
                        <h1 className="text-xl p-0 backdrop-blur text-stone-100 inline px-2 rounded-full">
                           {banner?.title}
                        </h1>
                        <br/>

                            <Link href={link}>
                                <button type="button" className="bg-white rounded-xl px-3 py-2 mt-5">
                                    Learn more
                                </button>
                            </Link>

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
