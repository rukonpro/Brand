"use client"
import React, {useState} from 'react';
import Drawer from "@/app/components/Drawer/Drawer";
import Image from "next/image";
import MenuIcon from "@/public/images/menu.png";
import CategoryManu from "@/app/components/navbar/CategoryManu";

const CategoryDrawer = ({categories}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const handleClose = () => {
        setIsDrawerOpen(false);
    };
    return (
        <div>
            <button type="button"
                    onClick={handleToggleDrawer}
            >
                <Image src={MenuIcon} alt="MenuIcon"/>
            </button>
            <Drawer
                destination="right"
                isDrawerOpen={isDrawerOpen}
                handleClose={handleClose}
            >

                <div className="w-full">
                    <CategoryManu categories={categories} />
                </div>
            </Drawer>
        </div>
    );
};
export default CategoryDrawer;