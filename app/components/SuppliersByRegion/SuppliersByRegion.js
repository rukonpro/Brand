import React from 'react';
import Image from 'next/image';
import AE from "@/public/images/AE@2x.png";

const SuppliersByRegion = () => {
    const countryShops = [
        {
            country: "Arabic Emirates",
            flagIcon: "🇦🇪",
            shopUrl: "www.brand.ae"
        },
        {
            country: "Australia",
            flagIcon: "🇦🇺",
            shopUrl: "www.brand.ae"
        },
        {
            country: "United States",
            flagIcon: "🇺🇸",
            shopUrl: "www.brand.ae"
        },
        {
            country: "Russia",
            flagIcon: "🇷🇺",
            shopUrl: "www.brand.ae"
        },
        {
            country: "Italy",
            flagIcon: "🇮🇹",
            shopUrl: "www.brand.it"
        },
        {
            country: "Denmark",
            flagIcon: "🇩🇰",
            shopUrl: "www.denmark.com.dk"
        },
        {
            country: "France",
            flagIcon: "🇫🇷",
            shopUrl: "www.brand.com.fr"
        },
        {
            country: "China",
            flagIcon: "🇨🇳",
            shopUrl: "www.brand.ae"
        },
        {
            country: "Great Britain",
            flagIcon: "🇬🇧",
            shopUrl: "www.brand.co.uk"
        },
        {
            country: "Bangladesh",
            flagIcon: "🇧🇩",
            shopUrl: "www.brand.com.bd"
        }
    ];




    return (
        <div className="py-5 px-3">
            <div className='max-w-[1200px] mx-auto'>
                <h1 className='text-2xl py-5'>Suppliers by region</h1>

                <ul className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 '>
                    {
                        countryShops?.map((data, index) => {
                            return (
                                <li key={index} className='grid gap-2 grid-cols-12 items-center bg-white dark:bg-slate-800 p-4 rounded-lg'>
                                    <div className='sm:col-span-2 col-span-3'>
                                       <p className="text-xl">{data?.flagIcon}</p>
                                    </div>
                                    <div className="sm:col-span-10 col-span-9">
                                        <h1 className='text-sm text-gray-800 dark:text-slate-50'>{data?.country}</h1>
                                        <p className='text-gray-500 text-xs truncate hover:text-clip dark:text-slate-400'>{data?.shopUrl}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default SuppliersByRegion;