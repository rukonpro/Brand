import React from 'react';

const RelatedProductsSkeleton = () => {
    return (
        <div className=" p-6 bg-white shadow-md rounded-md dark:bg-slate-800">
            {/* Related Products Heading */}
            <h2 className="text-lg font-bold text-gray-700 dark:text-slate-400 mb-4">Related products</h2>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0.5 md:gap-4">
                {/* Skeleton for each product */}
                {[0,1, 2, 3, 5, 6].map((item) => (
                    <div key={item} className="p-4 border border-gray-200 rounded-md dark:border-slate-600">
                        {/* Image placeholder */}
                        <div className="w-full h-28 bg-gray-200 rounded-md dark:bg-slate-700"></div>

                        {/* Price */}
                        <div className="mt-4 bg-gray-200 h-6 w-20 rounded-md dark:bg-slate-700"></div>

                        {/* Product Name */}
                        <div className="mt-2 bg-gray-200 h-4 w-32 rounded-md dark:bg-slate-700"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProductsSkeleton;
