"use client"
import { useState, useRef, useEffect, Suspense } from 'react';
import Link from "next/link";
import OfferCard from "@/app/components/offers/OfferCard";
import { SkeletonOfferCard } from "@/app/components/Skeletons/OfferSkeletons";
import { getOffers } from "@/app/utils/offer/fetch_offer_api";

const Slider = () => {
    const sliderRef = useRef(null);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true); // To track if there's more data to fetch
    const totalItemsInDB = 50; // Assuming there are 50 items in the database

    // Function to fetch items from the database
    const fetchItems = async (pageNum) => {
        setIsFetching(true);
        try {
            // Simulate an API call to fetch data (replace this with your actual fetch)
            const response = await getOffers({
                page: pageNum,
            });
            const data = await response?.data;
            // Append new items to the existing items
          
                setItems((prevItems) => [...prevItems, ...data?.data]);
           


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


    // Initial load of 10 items
    useEffect(() => {
        fetchItems(page);
    }, [page]);

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

    return (
        <div className="relative w-full">

            <ul
                ref={sliderRef}
                className="flex overflow-x-auto scroll-smooth gap-0.5 snap-x snap-mandatory scrollbar-hide select-none"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onScroll={handleScroll} // Listen to scroll event
                style={{ userSelect: "none", }}
            >
                {/* Render fetched items as slides */}
                {items?.map((item, index) => (
                    <li
                        key={index}
                        draggable={false}
                        className=" h-64 w-44  snap-center flex-shrink-0 p-2  bg-white  dark:bg-slate-800 relative "
                    >
                        <Suspense fallback={<SkeletonOfferCard />}>
                            <Link href={`/details/${item?.product?.id}`} draggable={false}>
                                <OfferCard offer={item} />
                            </Link>
                        </Suspense>


                    </li>
                ))}
                {isFetching && [1, 2, 3, 4, 5].map((_, i) =>
                    <li key={i}>
                        <SkeletonOfferCard />
                    </li>)}
            </ul>
        </div>
    );
};

export default Slider;
