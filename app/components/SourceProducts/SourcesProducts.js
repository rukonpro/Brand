import React from 'react';
import SourceCard from "@/app/components/SourceProducts/SourceCard";
import Link from "next/link";
import SourceProductCard from "@/app/components/SourceProducts/SourceProductCard";
import fakeData from "@/app/FakeData/FakeData";


const SourcesProducts =({sourceCard}) => {

    const filterData=fakeData.products.filter(data=>data.source===sourceCard.id);

    return (
        <div className="sm:px-3">
            <div className='max-w-[1200px] mx-auto mt-5'>
                <div
                    className='grid grid-cols-12  border-2 border-gray-200 sm:rounded-lg gap-[2px] bg-gray-200 overflow-hidden'>
                    <div className="md:col-span-3 col-span-12 bg-white">
                        <SourceCard
                            id={sourceCard.id}
                            image={sourceCard.coverPhoto}
                            title={sourceCard.title}/>
                    </div>
                    <div className='grid md:grid-cols-5 grid-cols-2 md:col-span-9 col-span-12 gap-[2px]'>
                        {
                            filterData?.slice(0, 10).map((product, index) => {
                                return (
                                    <div key={index} className='bg-white'>
                                        <Link href={`/details/${product.title}`}>
                                            <SourceProductCard product={product}/>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SourcesProducts;