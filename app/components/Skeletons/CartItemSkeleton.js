import React from 'react';

const CartItemSkeleton = () => {
    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md dark:bg-slate-800">
            {/* Individual Item */}
            <div className="flex items-start justify-between p-4 border-b border-gray-200 dark:border-slate-600">
                <div className="flex">
                    {/* Image Placeholder */}
                    <div className="w-16 h-16 bg-gray-200 rounded-md dark:bg-slate-700"></div>

                    {/* Item Details */}
                    <div className="ml-4 space-y-2">
                        <div className="bg-gray-200 h-4 w-32 rounded dark:bg-slate-700"></div>
                        <div className="bg-gray-200 h-4 w-24 rounded dark:bg-slate-700"></div>
                        <div className="bg-gray-200 h-4 w-16 rounded dark:bg-slate-700"></div>
                    </div>
                </div>

                {/* Price and Remove Button */}
                <div className="flex flex-col items-end space-y-2">
                    <div className="bg-gray-200 h-4 w-12 rounded dark:bg-slate-700"></div>
                    <div className="bg-gray-200 h-4 w-4 rounded-full dark:bg-slate-700"></div>
                </div>
            </div>

            {/* Another Item */}
            <div className="flex items-start justify-between p-4 border-b border-gray-200 dark:border-slate-600">
                <div className="flex">
                    {/* Image Placeholder */}
                    <div className="w-16 h-16 bg-gray-200 rounded-md dark:bg-slate-700"></div>

                    {/* Item Details */}
                    <div className="ml-4 space-y-2">
                        <div className="bg-gray-200 h-4 w-32 rounded dark:bg-slate-700"></div>
                        <div className="bg-gray-200 h-4 w-24 rounded dark:bg-slate-700"></div>
                        <div className="bg-gray-200 h-4 w-16 rounded dark:bg-slate-700"></div>
                    </div>
                </div>

                {/* Price and Remove Button */}
                <div className="flex flex-col items-end space-y-2">
                    <div className="bg-gray-200 h-4 w-12 rounded dark:bg-slate-700"></div>
                    <div className="bg-gray-200 h-4 w-4 rounded-full dark:bg-slate-700"></div>
                </div>
            </div>

            {/* Remove All Button */}
            <div className="flex justify-end p-4">
                <div className="bg-gray-200 h-8 w-24 rounded-md dark:bg-slate-700"></div>
            </div>
        </div>
    );
};

export default CartItemSkeleton;
