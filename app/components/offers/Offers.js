"use client"
import React, { Suspense, useEffect, useRef, useState } from 'react';
import OfferTiming from './OfferTiming';
import { DealsSkeleton } from "@/app/components/Skeletons/OfferSkeletons";
import Slider from "@/app/components/offers/Slider";
import {getOffers} from "@/app/utils/offer/fetch_offer_api";



const Offers = () => {
    const sliderRef = useRef(null);
    const [items, setItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);


    const getProductData = async () => {
        const data = await getOffers({page:1, pageSize:10, isActive:true})
        setItems(data?.offers);

    }

    useEffect(() => {
        getProductData()
    },[])

    console.log(items)

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
                            // handleMouseDown={handleMouseDown}
                            // handleMouseMove={handleMouseMove}
                            // handleMouseLeave={handleMouseLeave}
                            // handleMouseUp={handleMouseUp}
                            // handleScroll={handleScroll}
                            // isFetching={isFetching}
                            items={items}
                            // sliderRef={sliderRef}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offers;