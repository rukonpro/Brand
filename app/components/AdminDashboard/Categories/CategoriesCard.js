import React from 'react';
import Image from "next/image";
import Photo from "@/public/images/output-onlinegiftools.gif";
import CategoriesDropdown from "@/app/components/Dropdown/CategoriesDropdown";
import { MdEdit, MdDelete, MdCreateNewFolder } from "react-icons/md";
import CategoryDropdownButton from './CategoryDropdownButton';
const CategoriesCard = ({ category, handleOpenModal,setCategoryId }) => {
    return (
        <div
            className="relative bg-white dark:bg-slate-800 sm:rounded-lg sm:border-0  shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out"
        >
           <CategoryDropdownButton handleOpenModal={handleOpenModal} setCategoryId={setCategoryId} category={category}/>


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

                    <Image src={Photo} alt="search photo" width={300} height={300} />
            }
            <div className="p-4">
                <h2 className="text-lg text-slate-700 dark:text-slate-200 font-semibold mb-2 truncate hover:text-clip">{category?.name}</h2>
            </div>
        </div>
    );
};

export default CategoriesCard;