import React from 'react';

const SkeletonProfileSidebarBanner = () => {
    return (
        <div className="relative w-full">
            <div className="mb-6 py-7 px-3 absolute w-full bg-blue-800/50">
                <div>
                    <div className="flex items-center justify-between w-full">
                        <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-gray-300 rounded-full border-2 border-white animate-pulse"></div>

                        <div>
                            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="w-full h-36 bg-gray-300 animate-pulse"></div>
            </div>
        </div>

    );
};

export default SkeletonProfileSidebarBanner;