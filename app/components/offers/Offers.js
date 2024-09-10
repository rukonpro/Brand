"use client"
import React, {useRef, useState} from 'react';
import OfferCard from './OfferCard';
import OfferTiming from './OfferTiming';
import Link from "next/link";
import product1 from "@/public/images/product55.png"
import product2 from "@/public/images/image34.png";
import product3 from "@/public/images/image35.png";
import product4 from "@/public/images/image98.png";

import backIcon from "@/public/images/left-back-icon.png";
import Image from "next/image";

const Offers = ({offers}) => {

    const [showLeft,setShowLeft]=useState(false);
    const [showRight,setShowRight]=useState(true);

    const scrollRef = useRef();
    const handleScrollButtonClick = (scroll) => {

        if(scrollRef.current){
            if ( scroll!=="left") {
                scrollRef.current.scrollLeft += 150;
            }
            else {
                scrollRef.current.scrollLeft -= 150;
            }
        }

    };


    return (
        <div className="sm:px-3">
            <div className='max-w-[1200px] mx-auto mt-5 '>
                <div className='grid grid-cols-12 gap-[2px]  sm:rounded-lg  bg-gray-200 border-2 border-gray-200 overflow-hidden'>
                    <div className="md:col-span-3 col-span-12  bg-white overflow-hidden  ">
                        <OfferTiming />
                    </div>
                    <div className="md:col-span-9 col-span-12 relative">
                        {<button onClick={() => handleScrollButtonClick("left")}
                                 className="absolute left-0 top-1/2 bg-gray-600/70 hover:bg-gray-600 px-2 py-1 md:block hidden">
                            <Image src={backIcon} alt="backIcon"/>
                        </button>}
                        {<button onClick={() => handleScrollButtonClick("right")}
                                 className="absolute right-0 top-1/2 bg-gray-600/70 hover:bg-gray-600 rotate-180 px-2 py-1 md:block hidden">
                            <Image src={backIcon} alt="backIcon"/>
                        </button>}
                        <ul
                            ref={scrollRef}
                            className='  flex gap-0.5  w-full scroll-smooth overflow-x-auto overscroll-x-none overflow-visible   touch-pan-x wrapper '
                            /*     onFocus={handleScrollButtonClick}*/
                        >
                            {
                                offers?.map((offer) => {
                                    return (
                                        <li key={offer?.id} className='p-2  bg-white cursor-pointer  '>
                                            <Link href={`/details/${offer?.product?.id}`}>
                                                <OfferCard offer={offer}/>
                                            </Link>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offers;