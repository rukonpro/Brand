"use client";
import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { getOffers } from '@/app/utils/offer/fetch_offer_api';
import Link from "next/link";


const OfferSlider = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const pageSize=10;
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const data = await getOffers({ currentPage: 1, pageSize: pageSize, isActive: true });
                if (data.success) {
                    setOffers(data?.offers);
                } else {
                    setError(data?.error);
                }
            } catch (err) {
                setError('Failed to load offers');
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    const calculateDiscountedPrice = (price, discountValue) => {
        return price - (price * discountValue) / 100;
    };



    if (!loading && error) {
        return <div className="py-8 text-red-500 text-center">Error: {error}</div>;
    }

    if (!loading && !offers.length) {
        return <div className="py-8 text-center">No active offers available</div>;
    }

    return (
        <div className="sm:px-3">
            <div className="max-w-[1200px] mx-auto mt-5">
                <h1 className="text-2xl py-5 sm:px-0 px-4">Deals and offers</h1>
                <div className="sm:rounded-lg bg-gray-200 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-700 overflow-hidden">
                    <Splide
                        options={{
                            type: 'loop',
                            perPage: 6,
                            gap: '2px',
                            autoplay: true,
                            interval: 2000,
                            pauseOnHover: true,
                            arrows: true,
                            pagination: true,
                            breakpoints: {
                                1024: { perPage: 4 },
                                768: { perPage: 3 },
                                640: { perPage: 2 },
                            },
                        }}
                        aria-label="Offer Slider"
                    >

                        {
                            loading? Array.from({ length: 6 }).map((_, i) => (
                                        <SplideSlide key={i}>
                                            <div
                                                className="md:p-5 p-2 h-full  bg-white dark:bg-slate-800 dark:border-slate-700 relative"
                                            >
                                                <div className="absolute z-10 top-2 left-2 bg-gray-200 dark:bg-slate-600 h-6 w-16 rounded animate-pulse"></div>
                                                <div className="relative">
                                                    <div className="w-auto h-40 bg-gray-200 dark:bg-slate-600 rounded animate-pulse"></div>
                                                </div>
                                                <div className="mt-2 flex items-center space-x-2">
                                                    <div className="h-6 w-20 bg-gray-200 dark:bg-slate-600 rounded animate-pulse"></div>
                                                    <div className="h-4 w-16 bg-gray-200 dark:bg-slate-600 rounded animate-pulse"></div>
                                                </div>
                                            </div>
                                        </SplideSlide>
                                    )):
                            offers.map((offer) =>
                            offer.Variant.map((variant) => (

                                  <SplideSlide
                                      key={variant.id}
                                      className="w-[calc(50%-4px)] sm:w-[calc(33.33%-5.33px)] md:w-[calc(25%-6px)] lg:w-[calc(20%-6.4px)] bg-white dark:bg-slate-900 overflow-hidden"
                                  >
                                      <Link
                                          href={`/details/${variant.productId}`}>
                                      <div className="relative h-48 w-72">
                                          <Image
                                              src={variant.images[0]}
                                              alt={offer.description}
                                              fill
                                              className="object-center"
                                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                              loading="lazy"
                                          />
                                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                                              {offer.description}
                                          </div>
                                      </div>
                                      <div className="p-4">
                                          <div className="mt-2">
                                            <span className="text-lg font-bold text-blue-300">
                                                ${calculateDiscountedPrice(variant.price, offer.discountValue).toFixed(2)}
                                            </span>
                                              <span className="ml-2 text-sm text-gray-500 line-through">
                                                ${(variant.price / 100).toFixed(2)}
                                            </span>
                                          </div>
                                      </div>
                                      </Link>
                                  </SplideSlide>

                            ))
                        )}


                    </Splide>

                </div>
            </div>
            <style jsx>{`
                .splide__slide {
                    transition: all 0.3s ease;
                }
                .splide__arrow {
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    border-radius: 50%;
                    padding: 10px;
                }
                .splide__pagination {
                    bottom: 10px;
                }
                .splide__pagination__page {
                    background: gray;
                    width: 10px;
                    height: 10px;
                    margin: 0 5px;
                }
                .splide__pagination__page.is-active {
                    background: black;
                }
                @media (max-width: 640px) {
                    .splide__slide {
                        width: calc(80% - 4px);
                    }
                }
            `}</style>
        </div>
    );
};

export default OfferSlider;