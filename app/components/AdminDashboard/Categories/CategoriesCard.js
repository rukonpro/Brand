import React from 'react';
import Image from "next/image";
import Photo from "@/public/images/output-onlinegiftools.gif";
import CategoriesDropdown from "@/app/components/Dropdown/CategoriesDropdown";
const CategoriesCard = ({category}) => {
    return (
        <div
            className="relative bg-white dark:bg-slate-800 sm:rounded-lg sm:border-0  shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out"
        >
         <CategoriesDropdown/>
                {
                    category?.photo ?
                        <Image
                            className="w-full sm:h-48 h-32 object-cover"
                            placeholder="blur"
                            blurDataURL={category?.photo}
                            src={category?.photo}
                            width={300}
                            height={300}
                            alt={category?.name}
                        /> :

                        <Image src={Photo} alt="search photo" width={300} height={300}/>
                }
                <div className="p-4">
                    <h2 className="text-lg text-slate-700 dark:text-slate-200 font-semibold mb-2">{category?.name}</h2>
                    <p className="text-slate-600 dark:text-slate-300">{category?.description}</p>
                </div>
        </div>
    );
};

export default CategoriesCard;