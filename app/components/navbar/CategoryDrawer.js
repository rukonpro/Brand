"use client"
import React, {useState} from 'react';
import Drawer from "@/app/components/Drawer/Drawer";
import Image from "next/image";
import MenuIcon from "@/public/images/menu.png";
import CategoryManu from "@/app/components/navbar/CategoryManu";

const CategoryDrawer = () => {
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
                destination="left"
                isDrawerOpen={isDrawerOpen}
                handleClose={handleClose}
            >

                <div className="w-full">
                    <h1>Category deawer</h1>
                    <CategoryManu categories={categories} />
                </div>
            </Drawer>
        </div>
    );
};
export const categories = [
    {
        id: 1,
        name: "Electronics",
        parentId: null,
        children: [
            {
                id: 2,
                name: "Mobile Phones",
                parentId: 1,
                children: [
                    {
                        id: 3,
                        name: "Smartphones",
                        parentId: 2,
                        children: [
                            {
                                id: 4,
                                name: "Android Phones",
                                parentId: 3,
                                children: [
                                    {
                                        id: 5,
                                        name: "Samsung",
                                        parentId: 4,
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 1,
        name: "Electronics",
        parentId: null,
        children: [
            {
                id: 2,
                name: "Mobile Phones",
                parentId: 1,
                children: [
                    {
                        id: 3,
                        name: "Smartphones",
                        parentId: 2,
                        children: [
                            {
                                id: 4,
                                name: "Android Phones",
                                parentId: 3,
                                children: [
                                    {
                                        id: 5,
                                        name: "Samsung",
                                        parentId: 4,
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 1,
        name: "Electronics",
        parentId: null,
        children: [
            {
                id: 2,
                name: "Mobile Phones",
                parentId: 1,
                children: [
                    {
                        id: 3,
                        name: "Smartphones",
                        parentId: 2,
                        children: [
                            {
                                id: 4,
                                name: "Android Phones",
                                parentId: 3,
                                children: [
                                    {
                                        id: 5,
                                        name: "Samsung",
                                        parentId: 4,
                                        children: []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
export default CategoryDrawer;