import React from 'react';

const JoinNowCardSkeleton = () => {
    return (
        <div className='grid grid-cols-3 gap-1 items-center'>
            <div className="col-span-1">
                <div className="rounded-full h-[44px] w-[44px] bg-gray-300 animate-pulse"></div>
            </div>
            <div className="col-span-2">
                <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
        </div>

    );
};

export default JoinNowCardSkeleton;