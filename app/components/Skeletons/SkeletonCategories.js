
export const SkeletonCategories = () => {
    return (
        <div className="w-full p-4 bg-white dark:bg-slate-800  min-h-96 rounded-md">
            <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded mb-4 w-3/4 animate-pulse"></div>
            {[1, 2, 3,4,5,6,7].map((_, i) => (
                <div key={i} className="h-6 bg-slate-300 dark:bg-slate-600 rounded mb-4 w-full animate-pulse"></div>
            ))}
        </div>
    );
};

export const SkeletonSlider = () => {
    return (
        <div className="relative w-full h-60 md:h-96 overflow-hidden">
            {/* Skeleton for the images */}
            <div className="absolute top-0 left-0 w-full h-full bg-slate-300 dark:bg-slate-600 animate-pulse"></div>

            {/* Skeleton for the heading and button */}
            <div className="absolute top-10 left-5 w-60">
                <div className="h-6 w-3/4 bg-slate-400 dark:bg-slate-500 animate-pulse mb-2 rounded-full"></div>
                <div className="h-6 w-1/3 bg-slate-400 dark:bg-slate-500 animate-pulse rounded-full"></div>
            </div>

            {/* Skeleton for the navigation buttons (Previous and Next) */}
            <button
                className="absolute top-1/2 left-4 w-10 transform -translate-y-1/2 bg-slate-400 dark:bg-slate-500 rounded-full p-2"></button>
            <button
                className="absolute top-1/2 right-4 w-10 transform -translate-y-1/2 bg-slate-400 dark:bg-slate-500 rounded-full p-2"></button>

            {/* Skeleton for the dots at the bottom */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {[1, 2, 3].map((_, index) => (
                    <span key={index} className="h-4 w-4 bg-slate-400 dark:bg-slate-500 rounded-full animate-pulse"></span>
                ))}
            </div>
        </div>
    );
};

export const SkeletonNotifications = () => {
    return [1, 2, 3].map((_, i) => (
        <div key={i} className={`h-24 bg-slate-300 dark:bg-slate-500   rounded mb-4 w-full animate-pulse ${i===0&&"sm:col-span-1 col-span-2"}`}></div>
    ))
};


export const SkeletonHeader = () => {
    return (
        <div className="flex gap-4 py-4  min-h-96 max-w-[1200px] mx-auto">
            {/* Left Categories Section */}
            <div className="w-1/4">
                <SkeletonCategories/>
            </div>

            {/* Center Slider Section */}
            <div className="w-1/2">
                <SkeletonSlider/>
            </div>

            {/* Right Notifications Section */}
            <div className="w-1/4 ">
                <SkeletonNotifications/>
            </div>
        </div>
    );
};
