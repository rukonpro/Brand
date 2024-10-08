"use client"
import React, {useState} from 'react';
import Drawer from "@/app/components/Drawer/Drawer";
import Image from "next/image";
import MenuIcon from "@/public/images/menu.png";
import CategoryManu from "@/app/components/navbar/CategoryManu";
import { FiAlignCenter } from 'react-icons/fi';
import { FaXmark } from 'react-icons/fa6';

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
            <button type="button" id="categoryModalToggleHomePage"
                    onClick={handleToggleDrawer}
            >
                  <FiAlignCenter size={25}/>
            </button>
            <Drawer
                destination="left"
                isDrawerOpen={isDrawerOpen}
                handleClose={handleClose}
            >

                <div className="w-full">
                    <CategoryManu categories={categories}
                     closeButton={  <button onClick={handleClose}><FaXmark size={25}/></button>}
                    />
                </div>
            </Drawer>
        </div>
    );
};
export default CategoryDrawer;