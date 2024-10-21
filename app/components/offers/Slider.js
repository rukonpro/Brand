"use client"
import { Suspense } from 'react';
import Link from "next/link";
import OfferCard from "@/app/components/offers/OfferCard";
import { SkeletonOfferCard } from "@/app/components/Skeletons/OfferSkeletons";


const Slider = ({ sliderRef, handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove, handleScroll, isFetching, items }) => {

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
                {/* {isFetching && [1, 2, 3, 4, 5].map((_, i) =>
                    <li key={i}>
                        <SkeletonOfferCard />
                    </li>)} */}
            </ul>
        </div>
    );
};

export default Slider;
