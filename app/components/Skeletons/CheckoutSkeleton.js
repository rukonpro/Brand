import React from 'react';

const CheckoutSkeleton = () => {
    return (
        <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md dark:bg-slate-800">

            {/* Coupon Section */}
            <div className="mb-4">
                <div className="flex">
                    <div className="border border-gray-300 rounded-l-md px-4 py-2 w-full bg-gray-200 dark:border-slate-600 dark:bg-slate-700"></div>
                    <div className="bg-gray-200 px-4 py-2 rounded-r-md dark:bg-slate-700"></div>
                </div>
            </div>

            {/* Subtotal, Discount, Tax */}
            <div className="border-t border-gray-200 my-4 dark:border-slate-600"></div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <div className="bg-gray-200 h-4 w-24 rounded dark:bg-slate-700"></div>
                    <div className="bg-gray-200 h-4 w-16 rounded dark:bg-slate-700"></div>
                </div>

                <div className="flex justify-between">
                    <div className="bg-gray-200 h-4 w-24 rounded dark:bg-slate-700"></div>
                    <div className="bg-gray-200 h-4 w-16 rounded dark:bg-slate-700"></div>
                </div>

                <div className="flex justify-between">
                    <div className="bg-gray-200 h-4 w-24 rounded dark:bg-slate-700"></div>
                    <div className="bg-gray-200 h-4 w-16 rounded dark:bg-slate-700"></div>
                </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 my-4 dark:border-slate-600"></div>
            <div className="flex justify-between mb-6">
                <div className="bg-gray-200 h-6 w-24 rounded dark:bg-slate-700"></div>
                <div className="bg-gray-200 h-6 w-20 rounded dark:bg-slate-700"></div>
            </div>

            {/* Checkout Button */}
            <div className="bg-gray-200 h-10 w-full rounded-md dark:bg-slate-700"></div>

            {/* Payment Icons */}
            <div className="flex justify-center items-center space-x-4 mt-6">
                <div className="bg-gray-200 h-8 w-8 rounded dark:bg-slate-700"></div>
                <div className="bg-gray-200 h-8 w-8 rounded dark:bg-slate-700"></div>
                <div className="bg-gray-200 h-8 w-8 rounded dark:bg-slate-700"></div>
                <div className="bg-gray-200 h-8 w-8 rounded dark:bg-slate-700"></div>
            </div>
        </div>
    );
};

export default CheckoutSkeleton;
