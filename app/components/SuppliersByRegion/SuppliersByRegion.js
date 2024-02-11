import React from 'react';
import Image from 'next/image';
import AE from "@/public/images/AE@2x.png";

const SuppliersByRegion = () => {
    const datas = [
        {
            country: "Arabic Emirates",
            shop: "shopname.ae",
            flag: AE
        },
        {
            country: "Australia",
            shop: "shopname.ae",
            flag: AE
        },
        {
            country: "United States",
            shop: "shopname.ae",
            flag: AE
        },
        {
            country: "Russia",
            shop: "shopname.ae",
            flag: AE
        },
        {
            country: "Italy",
            shop: "shopname.it",
            flag: AE
        },
        {
            country: "Denmark",
            shop: "denmark.com.dk",
            flag: AE
        },
        {
            country: "France",
            shop: "shopname.com.fr",
            flag: AE
        },
        {
            country: "Arabic Emirates",
            shop: "shopname.ae",
            flag: AE
        },
        {
            country: "China",
            shop: "shopname.ae",
            flag: AE
        },
        {
            country: "Great Britain",
            shop: "shopname.co.uk",
            flag: AE
        },
    ]
    return (
        <div className="pt-5">
            <div className='max-w-[1200px] mx-auto'>
                <h1 className='text-2xl py-5'>Suppliers by region</h1>

                <ul className='grid grid-cols-5 gap-2 '>
                    {
                        datas?.map((data, index) => {
                            return (
                                <li key={index} className='grid grid-cols-12 items-center'>
                                    <div className='col-span-2'>
                                        <Image src={data.flag} alt='' />
                                    </div>
                                    <div className="col-span-10">
                                        <h1 className='text-sm text-gray-800'>{data?.country}</h1>
                                        <small className='text-gray-500'>{data?.shop}</small>
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