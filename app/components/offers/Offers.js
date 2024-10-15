"use client"
import React, {Suspense} from 'react';
// import OfferCard from './OfferCard';
import OfferTiming from './OfferTiming';
// import Link from "next/link";

// import backIcon from "@/public/images/left-back-icon.png";
// import Image from "next/image";
import {DealsSkeleton, SkeletonOfferCard} from "@/app/components/Skeletons/OfferSkeletons";
import Slider from "@/app/components/offers/Slider";

const Offers = () => {


    return (
        <div className="sm:px-3">
            <div className='max-w-[1200px] mx-auto mt-5 '>
                <div className='grid grid-cols-12 gap-[2px]  sm:rounded-lg  bg-gray-200 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-700 overflow-hidden'>
                    <div className="md:col-span-3 col-span-12  bg-white overflow-hidden  ">
                       <Suspense fallback={<DealsSkeleton/>}>
                           <OfferTiming />
                       </Suspense>
                    </div>
                    <div className="md:col-span-9 col-span-12 relative">
                        <Slider/>
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offers;