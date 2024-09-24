import React from 'react';
import OurExtraServicesCard from './OurExtraServicesCard';
import ImageCover1 from "@/public/images/image108.png";
import imageCover2 from "@/public/images/image109.png";
import imageCover3 from "@/public/images/image110.png";
import imageCover4 from "@/public/images/image111.png";
import SearchIcon from "@/public/images/searchIcon.png";
import CustomizeIcon from "@/public/images/customizeIcon.png";
import MonitoringIcon from "@/public/images/monitoringIcon.png";
import SendIcon from "@/public/images/sendIcon.png";



const OurExtraServices = () => {

    const datas = [
        {
            title: "Source from \n Industry Hubs",
            cover: ImageCover1,
            icon: SearchIcon
        },
        {
            title: "Customize Your Products",
            cover: imageCover2,
            icon: CustomizeIcon
        },
        {
            title: "Fast, reliable shipping by ocean or air",
            cover: imageCover3,
            icon: SendIcon
        },
        {
            title: "Product monitoring and inspection",
            cover: imageCover4,
            icon: MonitoringIcon
        },

    ]


    return (
        <div>
            <div className='max-w-[1200px] mx-auto pt-5'>
                <h1 className='text-2xl py-5 px-3'>Our extra services</h1>
                <ul className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 sm:gap-3 gap-1 sm:px-3'>
                    {
                        datas?.map((data,index) => {
                            return (
                               <li key={index} className="sm:rounded-lg bg-white dark:bg-slate-800 relative overflow-hidden">
                                   <OurExtraServicesCard  data={data} />
                               </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default OurExtraServices;