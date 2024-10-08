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

export const DealsSkeleton = () => {
    return (
        <div className="relative overflow-hidden grid grid-cols-1 bg-slate-300/50 animate-pulse">

            {/* Skeleton for the header */}
            <div className="absolute p-5">
                <div className="h-8 w-40 bg-slate-400 rounded-full"></div> {/* Placeholder for the heading */}
            </div>

            {/* Skeleton for the image */}
            <div className="h-[256px] bg-slate-400">
                {/* Placeholder for the image, height kept same */}
                <div className="w-full h-full bg-slate-400"></div>
            </div>
        </div>
    );
};
