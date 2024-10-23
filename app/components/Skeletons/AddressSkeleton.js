import React from 'react';

const AddressSkeleton = () => {
    return (
        <div className="w-full max-w-md mx-auto my-4">
            {/* Skeleton Card */}
            <div className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 animate-pulse space-y-4">

                {/* Circle Skeleton */}
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-slate-600 rounded-full"></div>
                    <div className="w-3/4 h-4 bg-gray-200 dark:bg-slate-600 rounded"></div>
                </div>

                {/* Name and Phone Skeleton */}
                <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-1/2"></div>

                {/* Address Skeleton */}
                <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-5/6"></div>

                {/* Region and Postal Skeleton */}
                <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-2/3"></div>

                {/* Button Skeleton */}
                <div className="h-8 bg-gray-200 dark:bg-slate-600 rounded-lg w-1/3 mt-4"></div>
            </div>
        </div>
    );
};

export default AddressSkeleton;
