"use client"
import React, { Suspense, useEffect, useRef, useState } from 'react';
import OfferTiming from './OfferTiming';
import { getOffers } from "@/app/utils/offer/fetch_offer_api";
import { DealsSkeleton } from "@/app/components/Skeletons/OfferSkeletons";
import Slider from "@/app/components/offers/Slider";

const Offers = () => {
    const sliderRef = useRef(null);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true); // To track if there's more data to fetch
    const totalItemsInDB = 50; // Assuming there are 50 items in the database


    // Initial load of 10 items
    useEffect(() => {
        fetchItems(page);
    }, [page,]);


    // Function to fetch items from the database
    const fetchItems = async (pageNum) => {
        setIsFetching(true);
        try {
            // Simulate an API call to fetch data (replace this with your actual fetch)
            const response = await getOffers({
                page: pageNum,
            });
            const data = await response?.data || [];

            // Append new items to the existing items

            if (data?.data?.length > 0) {
                setItems((prevItems) => [...prevItems, ...data?.data]);
            }



            // Check if all items have been loaded
            if ((pageNum * 10) >= totalItemsInDB) {
                setHasMoreData(false); // No more data to fetch
            }

            setIsFetching(false);
        } catch (error) {
            console.error("Error fetching items:", error);
            setIsFetching(false);
        }
    };






    // Handling Mouse Drag Scroll
    const handleMouseDown = (e) => {
        const slider = sliderRef.current;
        slider.isDown = true;
        slider.startX = e.pageX - slider.offsetLeft;
        slider.scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
        const slider = sliderRef.current;
        slider.isDown = false;
    };

    const handleMouseUp = () => {
        const slider = sliderRef.current;
        slider.isDown = false;
    };

    const handleMouseMove = (e) => {
        const slider = sliderRef.current;
        if (!slider.isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - slider.startX) * 2; // Adjust scroll speed
        slider.scrollLeft = slider.scrollLeft - walk;
    };

    // Auto-scroll logic every 5 seconds
    useEffect(() => {
        const slider = sliderRef.current;

        const autoScroll = setInterval(() => {
            if (slider) {
                slider.scrollBy({ left: 300, behavior: 'smooth' });

                // Check if we're at the end of the slider
                if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 50) {
                    if (hasMoreData) {
                        setPage((prevPage) => prevPage + 1); // Increment page to fetch next items
                    } else {
                        // When all items are fetched, append the first few items to the end (loop behavior)
                        setItems((prevItems) => [...prevItems, ...prevItems.slice(0, 10)]);
                    }
                }
            }
        }, 5000);

        return () => clearInterval(autoScroll);
    }, [hasMoreData, items]);




    // Detect manual scroll to fetch more items or loop when all data is loaded
    const handleScroll = () => {
        const slider = sliderRef.current;
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 50 && !isFetching) {
            if (hasMoreData) {
                setPage((prevPage) => prevPage + 1); // Fetch next set of items
            } else {
                // Append the first few items for infinite loop behavior when all data is loaded
                setItems((prevItems) => [...prevItems, ...prevItems?.slice(0, 10)]);
            }
        }
    };
    return items?.length > 0 && (
        <div className="sm:px-3">
            <div className='max-w-[1200px] mx-auto mt-5 '>
                <div className='grid grid-cols-12 gap-[2px]  sm:rounded-lg  bg-gray-200 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-700 overflow-hidden'>
                    <div className="md:col-span-3 col-span-12  bg-white overflow-hidden  ">
                        <Suspense fallback={<DealsSkeleton />}>
                            <OfferTiming />
                        </Suspense>
                    </div>
                    <div className="md:col-span-9 col-span-12 relative">
                        <Slider
                            handleMouseDown={handleMouseDown}
                            handleMouseMove={handleMouseMove}
                            handleMouseLeave={handleMouseLeave}
                            handleMouseUp={handleMouseUp}
                            handleScroll={handleScroll}
                            isFetching={isFetching}
                            items={items}
                            sliderRef={sliderRef}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offers;