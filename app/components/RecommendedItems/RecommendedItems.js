import React from 'react';
import RecommendedItemsCard from './RecommendedItemsCard';

const RecommendedItems = () => {
    return (
        <div className='pt-5'>
            <div className='max-w-[1200px] mx-auto'>
                <h1 className='text-2xl py-5'>Recommended items</h1>
                <div className='grid grid-cols-5 gap-5 '>
                    <RecommendedItemsCard />
                    <RecommendedItemsCard />
                    <RecommendedItemsCard />
                    <RecommendedItemsCard />
                    <RecommendedItemsCard />
                    <RecommendedItemsCard />
                    <RecommendedItemsCard />
                    <RecommendedItemsCard />
                    <RecommendedItemsCard />
                    <RecommendedItemsCard />
                </div>
            </div>
        </div>
    );
};

export default RecommendedItems;