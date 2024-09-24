"use client"
import { useState, useEffect } from "react";
import banner1 from "@/public/images/BannerEcommerce-Nordics.png";
import banner2 from  "@/public/images/cloth-image-1.jpeg";
import banner3 from "@/public/images/clothes-image-2.webp";
import Image from "next/image";

const banners = [
    {
        id: 1,
        image: banner1,
        title: 'Welcome to Our Store!',
        link: '/?1',
    },
    {
        id: 2,
        image: banner2,
        title: 'Latest Collections!',
        link: '/?2',
    },
    {
        id: 3,
        image: banner3,
        title: 'Exclusive Offers!',
        link: '/?3',
    },
];

const BannerSlider = () => {
    const [current, setCurrent] = useState(0);
    const [link, setLink] = useState(banners[0]?.link);  // Initialize with first banner's link

    // Update the link whenever the current index changes
    useEffect(() => {
        setLink(banners[current]?.link);  // Set the current banner's link
    }, [current]);

    const nextSlide = () => {
        setCurrent(current === banners?.length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? banners?.length - 1 : current - 1);
    };

    console.log(link)
    return (
        <div className="relative w-full h-[500px] overflow-hidden">
            <button
                onClick={prevSlide}
                className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            >
                ◀
            </button>

            {banners.map((banner, index) => (
                <div
                    key={banner?.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === current ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Image
                        src={banner?.image}
                        alt={banner?.title}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                        <h1 className="text-4xl font-bold">{banner?.title}</h1>
                        <a
                            href={link}
                            className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Shop Now
                        </a>
                    </div>
                </div>
            ))}

            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            >
                ▶
            </button>
        </div>
    );
};

export default BannerSlider;
