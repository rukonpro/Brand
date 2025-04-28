

export const SkeletonOfferCard = () => {
    return (
        <div className="w-40 h-[240px] flex flex-col justify-between p-2 animate-pulse bg-gray-100 rounded-lg relative">

            {/* Skeleton for the countdown */}
            <div className="absolute top-0 right-0 h-4 w-12 bg-gray-300 rounded-full"></div>

            {/* Skeleton for the image */}
            <div className="flex justify-center">
                <div className="h-36 w-full bg-gray-300"></div>
            </div>

            {/* Skeleton for the product name */}
            <div className="flex justify-center">
                <div className="w-full">
                    <div className="h-6 bg-gray-300 rounded-full mb-3"></div>

                    {/* Skeleton for the discount badge */}
                    <div className="flex gap-2 justify-center items-center">
                        <div className="h-6 w-12 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const  DealsSkeleton = () => {
    return (
        <div className="splide" aria-label="Skeleton Offer Slider">
            <div className="splide__track">
                <ul className="splide__slides">
                    {[...Array(6)].map((_, index) => (
                        <li
                            key={index}
                            className="splide__slide w-[calc(50%-4px)] sm:w-[calc(33.33%-5.33px)] md:w-[calc(25%-6px)] lg:w-[calc(20%-6.4px)] bg-white dark:bg-slate-900 overflow-hidden"
                        >
                            <div className="relative h-48 w-full">
                                <div className="w-full h-full bg-gray-300 dark:bg-slate-600 animate-pulse" />
                                <div className="absolute top-2 left-2 bg-gray-400 dark:bg-slate-500 w-20 h-6 rounded animate-pulse" />
                            </div>
                            <div className="p-4">
                                <div className="mt-2 flex space-x-2">
                                    <div className="w-16 h-6 bg-gray-300 dark:bg-slate-600 rounded animate-pulse" />
                                    <div className="w-12 h-6 bg-gray-300 dark:bg-slate-600 rounded animate-pulse" />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <style jsx>{`
                .splide__slides {
                    display: flex;
                    gap: 2px;
                }
                .animate-pulse {
                    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }
                @media (max-width: 640px) {
                    .splide__slide {
                        width: calc(80% - 4px);
                    }
                }
            `}</style>
        </div>
    );
};
