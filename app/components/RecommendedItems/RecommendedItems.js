import React from 'react';
import RecommendedItemsCard from './RecommendedItemsCard';
import Product55 from "@/public/images/product55.png";

const RecommendedItems = () => {
    const products=[
        {
            image:Product55,
            title:"Jeans shorts for men blue color",
            price:10.30
        },
        {
            image:Product55,
            title:"Jeans shorts for men blue color",
            price:10.30
        },
        {
            image:Product55,
            title:"Jeans shorts for men blue color",
            price:10.30
        },
        {
            image:Product55,
            title:"Jeans shorts for men blue color",
            price:10.30
        },
        {
            image:Product55,
            title:"Jeans shorts for men blue color",
            price:10.30
        },
        {
            image:Product55,
            title:"Jeans shorts for men blue color",
            price:10.30
        },
        {
            image:Product55,
            title:"Jeans shorts for men blue color",
            price:10.30
        },
        {
            image:Product55,
            title:"Jeans shorts for men blue color",
            price:10.30
        },
        {
            image:Product55,
            title:"Jeans shorts for men blue color",
            price:10.30
        },
        {
            image:Product55,
            title:"Jeans shorts for men blue color",
            price:10.30
        },
    ]
    return (
        <div className='pt-5 sm:px-3'>
            <div className='max-w-[1200px] mx-auto'>
                <h1 className='text-2xl py-5 sm:px-0 px-3'>Recommended items</h1>
                <ul className='grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-2 gap-1 '>
                    {
                        products.map((product,index)=>{
                            return(
                               <li key={index}>
                                   <RecommendedItemsCard  product={product} />
                               </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default RecommendedItems;