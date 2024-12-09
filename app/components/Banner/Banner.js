import React, {Suspense} from 'react';
import JoinNowCard from "@/app/components/Banner/JoinNowCard";
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";
import BannerSlider from "@/app/components/Banner/BannerSlider";
import CategoryManu from "@/app/components/navbar/CategoryManu";
import {getBanners} from "@/app/utils/banner/fetch_banners_api";
import {SkeletonCategories, SkeletonNotifications, SkeletonSlider} from "@/app/components/Skeletons/SkeletonCategories";
import Link from "next/link";


const Banner =async () => {
    const [category, banners] = await Promise.all([
        getAllCategory(),
        getBanners()
    ]);

    return (
        <div className="md:px-3">
            <div className="max-w-[1200px] mx-auto border md:rounded-lg md:px-3  md:pt-3 pb-3 md:mt-5 bg-white dark:bg-gray-700 dark:text-stone-100 dark:border-slate-700">
                <div className='grid grid-cols-12 gap-3'>

                    <div className='md:col-span-3 col-span-12 px-3 md:px-0 overflow-y-auto scroll-smooth  max-h-96 md:block hidden bg-blue-100 dark:bg-slate-800 dark:text-stone-100 rounded-lg'>
                       <Suspense fallback={<SkeletonCategories/>}>
                           <CategoryManu categories={category?.data} />
                       </Suspense>

                    </div>
                    <div className='md:col-span-7 col-span-12 relative'>
                       <Suspense fallback={<SkeletonSlider/>}>
                           <BannerSlider banners={banners?.data}/>
                       </Suspense>

                    </div>

                    <div className='md:col-span-2 col-span-12 grid md:grid-cols-1 sm:grid-cols-3 grid-cols-2 gap-3 px-3 md:px-0 max-h-96 overflow-y-auto overflow-hidden'>


                        <Suspense fallback={<SkeletonNotifications/>}>
                               <JoinNowCard/>
                            <div className=" p-3 rounded-lg bg-[#360a65f8] text-white w-full h-full">
                                <h1 className="text-lg">Get US $10 off with a new supplier</h1>
                            </div>

                            <div className="p-3 rounded-lg bg-[#92504d] text-white w-full h-full">
                                <h1 className="text-lg">Send quotes with supplier preferences</h1>
                            </div>
                        </Suspense>
                    </div>

                </div>
            </div>

            <div className="max-w-[1200px] mx-auto pt-4 md:hidden block px-3">
                <Link href="/allCategory">All Categories</Link> |  <Link href="/">Hot offers</Link> |  <Link href="/">Gift Boxes</Link>
            </div>

        </div>
    );
};

export default Banner;
