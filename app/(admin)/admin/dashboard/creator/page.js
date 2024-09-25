import React from 'react';
import CreatorCard from "@/app/components/AdminDashboard/creatore/CreatorCard";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { TbBrandDebian } from "react-icons/tb";
import { PiFlagBannerFill } from "react-icons/pi";
import BackButton from "@/app/components/BackButtons/BackButton";
const Creator = () => {
    return (
        <div>

                <h1 className="text-lg font-bold pb-5">Creator</h1>


            <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">

                <li >
                    <CreatorCard Icon={AiFillProduct} title="Create a product" path="/admin/dashboard/creator/createProduct"/>
                </li>

                <li>
                    <CreatorCard Icon={BiSolidCategoryAlt} title="Create a Category" path="/admin/dashboard/creator/createCategory"/>
                </li>

                <li >
                    <CreatorCard Icon={TbBrandDebian} title="Create a Brand" path="/admin/dashboard/creator/createBrand"/>
                </li>
                <li >
                    <CreatorCard Icon={PiFlagBannerFill} title="Create a Banner" path="/admin/dashboard/creator/createBanner"/>
                </li>
            </ul>
        </div>
    );
};

export default Creator;