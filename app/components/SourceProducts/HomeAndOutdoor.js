import React from 'react';

import SourceCard from './SourceCard';
import SourceProductCard from './SourceProductCard';
import CoverImage from "@/public/images/image92.png";
import Link from "next/link";
const HomeAndOutdoor = () => {
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
        <div className="sm:px-3">
            <div className='max-w-[1200px] mx-auto mt-5'>
                <div className='grid grid-cols-12  border-2 border-gray-200 bg-gray-200 sm:rounded-lg gap-[2px] overflow-hidden'>
                    <div className="md:col-span-3 col-span-12">
                        <SourceCard image={CoverImage} title={<span>Home and <br/> outdoor</span>}/>
                    </div>
                    <ul className='grid md:grid-cols-5 grid-cols-2 md:col-span-9 col-span-12 gap-[2px]  '>
                        {
                            products.map((product,index)=>{
                                return (
                                    <li key={index} className='bg-white'>
                                        <Link href={`/details/${product.title}`}>
                                            <SourceProductCard/>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomeAndOutdoor;