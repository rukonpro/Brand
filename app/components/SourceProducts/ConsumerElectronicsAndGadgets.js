import React from 'react';
import SourceCard from './SourceCard';
import SourceProductCard from './SourceProductCard';
import CoverImage from "@/public/images/image98.png";
const ConsumerElectronicsAndGadgets = () => {
    const products=[
        {
            title:"Smart watches",
            discount:50,
            image:""
        },
        {
            title:"Smart watches",
            discount:50,
            image:""
        },
        {
            title:"Smart watches",
            discount:50,
            image:""
        },
        {
            title:"Smart watches",
            discount:50,
            image:""
        },
        {
            title:"Smart watches",
            discount:50,
            image:""
        },
        {
            title:"Smart watches",
            discount:50,
            image:""
        },
        {
            title:"Smart watches",
            discount:50,
            image:""
        },
        {
            title:"Smart watches",
            discount:50,
            image:""
        },
        {
            title:"Smart watches",
            discount:50,
            image:""
        },
        {
            title:"Smart watches",
            discount:50,
            image:""
        },
    ]
    return (
        <div className="px-3">
            <div className='max-w-[1200px] mx-auto mt-5'>
                <div className='grid grid-cols-12  border-2 border-gray-200 rounded-lg gap-[2px] bg-gray-200 overflow-hidden'>
                    <div className="md:col-span-3 col-span-12 bg-white">
                        <SourceCard image={CoverImage}/>
                    </div>
                    <div className='grid md:grid-cols-5 grid-cols-2 md:col-span-9 col-span-12 gap-[2px]'>

                        {
                            products.map((product,index)=>{
                                return (
                                    <div key={index} className='bg-white'>
                                        <SourceProductCard/>
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

export default ConsumerElectronicsAndGadgets;