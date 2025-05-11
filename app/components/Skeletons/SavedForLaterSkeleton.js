import React from 'react';

const SavedForLaterSkeleton = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md dark:bg-slate-800">
            {/* Saved for Later Heading */}
            <h2 className="text-lg font-bold text-gray-700 dark:text-slate-400 mb-4">Saved for later</h2>

            {/* Saved Items Grid */}
            <div className="grid grid-cols-4 gap-4">
                {/* Skeleton for each saved item */}
                {[1, 2, 3].map((item) => (
                    <div key={item} className="relative border border-gray-200 p-4 rounded-md dark:border-slate-600">
                        {/* Remove button placeholder */}
                        <div className="absolute top-2 right-2 bg-gray-200 h-4 w-4 rounded-full dark:bg-slate-700"></div>

                        {/* Image placeholder */}
                        <div className="w-full h-32 bg-gray-200 rounded-md dark:bg-slate-700"></div>

                        {/* Product details */}
                        <div className="mt-4">
                            <div className="bg-gray-200 h-4 w-32 rounded dark:bg-slate-700"></div>
                            <div className="bg-gray-200 h-4 w-16 mt-2 rounded dark:bg-slate-700"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedForLaterSkeleton;
