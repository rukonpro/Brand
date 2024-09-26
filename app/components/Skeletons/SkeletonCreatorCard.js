import React from 'react';

const SkeletonCreatorCard = () => {
    return (
        <div className="p-7 bg-white rounded-lg shadow-sm dark:bg-slate-700">
            <div className="animate-pulse flex flex-col ">
                <div className="bg-gray-300 dark:bg-slate-500 rounded-full h-[150px] w-[150px] mb-4"></div>
                <div className="h-6 bg-gray-300 dark:bg-slate-500 rounded w-1/2"></div>
            </div>
        </div>

    );
};

export default SkeletonCreatorCard;