"use client"
import React, {Suspense} from 'react';
// import OfferCard from './OfferCard';
import OfferTiming from './OfferTiming';
// import Link from "next/link";

// import backIcon from "@/public/images/left-back-icon.png";
// import Image from "next/image";
import {DealsSkeleton, SkeletonOfferCard} from "@/app/components/Skeletons/OfferSkeletons";
import Slider from "@/app/components/offers/Slider";

const Offers = ({offers}) => {

    // const scrollRef = useRef();
    // const handleScrollButtonClick = (scroll) => {
    //
    //     if(scrollRef.current){
    //         if ( scroll!=="left") {
    //             scrollRef.current.scrollLeft += 150;
    //         }
    //         else {
    //             scrollRef.current.scrollLeft -= 150;
    //         }
    //     }
    //
    // };


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
                        {/*{<button onClick={() => handleScrollButtonClick("left")}*/}
                        {/*         className="absolute left-0 top-1/2 bg-gray-600/70 rounded-r-full hover:bg-gray-600 px-2 py-1 md:block hidden">*/}
                        {/*    <Image src={backIcon} alt="backIcon"/>*/}
                        {/*</button>}*/}
                        {/*{<button onClick={() => handleScrollButtonClick("right")}*/}
                        {/*         className="absolute right-0 top-1/2 bg-gray-600/70 rounded-r-full hover:bg-gray-600 rotate-180 px-2 py-1 md:block hidden">*/}
                        {/*    <Image src={backIcon} alt="backIcon"/>*/}
                        {/*</button>}*/}
                        {/*<ul*/}
                        {/*    ref={scrollRef}*/}
                        {/*    className='  flex gap-0.5  w-full scroll-smooth overflow-x-auto overscroll-x-none overflow-visible   touch-pan-x wrapper '*/}
                        {/*    */}
                        {/*>*/}
                        {/*    {*/}
                        {/*        offers?.map((offer) => {*/}
                        {/*            return (*/}
                        {/*                <li key={offer?.id} className='p-2  bg-white cursor-pointer  dark:bg-slate-800 relative'>*/}
                        {/*                    <Link href={`/details/${offer?.product?.id}`}>*/}
                        {/*                        <Suspense fallback={<SkeletonOfferCard/>}>*/}
                        {/*                            <OfferCard offer={offer}/>*/}
                        {/*                         </Suspense>*/}
                        {/*                    </Link>*/}
                        {/*                </li>*/}
                        {/*            )*/}
                        {/*        })*/}
                        {/*    }*/}

                        {/*</ul>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offers;