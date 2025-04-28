import React from 'react';

export const SkeletonRecommendedItemCard = () => {
    return (
        <div className='p-5 sm:border-2 sm:rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700 animate-pulse'>
            <div className='flex justify-center'>
                {/* Placeholder for the image */}
                <div
                    className="  h-28 w-full bg-slate-300 dark:bg-slate-600 rounded-lg"></div>
            </div>
            <div className="pt-3">
                {/* Placeholder for the price */}
                <div className="h-7 bg-slate-300 dark:bg-slate-600 rounded w-24"></div>
            </div>
            {/* Placeholder for the product name */}
            <div className="pt-2">
                <div className="h-5 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
            </div>

        </div>
    );
};


export const SkeletonRecommendedItemsSection = () => {
    return (
        <div className='pt-5 sm:px-3'>
            <div className='max-w-[1200px] mx-auto border-2 pb-10 px-5 rounded-lg dark:border-slate-700 animate-pulse'>
                <div className='h-6 bg-slate-300 dark:bg-slate-600 rounded w-48 my-5'></div> {/* Placeholder for the "Recommended items" heading */}
                <ul className='grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-2 gap-1'>
                    {/* Simulate loading of multiple product cards */}
                    {[...Array(10)].map((_, index) => (
                        <li key={index}>
                            <SkeletonRecommendedItemCard /> {/* Reuse the skeleton for individual cards */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
