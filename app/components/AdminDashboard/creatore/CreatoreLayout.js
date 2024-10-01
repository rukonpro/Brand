"use client"
import React, {Suspense, useState} from 'react';
import CreatorCard from "@/app/components/AdminDashboard/creatore/CreatorCard";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { TbBrandDebian } from "react-icons/tb";
import { PiFlagBannerFill } from "react-icons/pi";
import AdminDashboardModal from "@/app/components/Drawer/AdminDashboardModal";
import Loader from "@/app/Loader";
import SkeletonCreatorCard from "@/app/components/Skeletons/SkeletonCreatorCard";
import CreateProductForm from "@/app/components/AdminDashboard/creatore/CreateProductForm";
import CreateCategoryForm from "@/app/components/AdminDashboard/creatore/CreateCategoryForm";
import CreateBannerForm from "@/app/components/AdminDashboard/creatore/CreateBannerForm";
import CreateBandForm from "@/app/components/AdminDashboard/creatore/CreateBrandForm";

const CreatorLayout = ({categories,categoriesMenu,brands}) => {
    const [openCreateProduct,setOpenCreateProduct] = useState(false);
    const [openCreateCategory,setOpenCreateCategory] = useState(false);
    const [openCreateBanner,setOpenCreateBanner] = useState(false);
    const [openCreateBrand,setOpenCreateBrand] = useState(false);
    const [open,setOpen]=useState(false);
    const[title,setTitle]=useState("");

    const OPEN_MODAL_TYPE={
        CREATE_PRODUCT:"CREATE_PRODUCT",
        CREATE_CATEGORY:"CREATE_CATEGORY",
        CREATE_BRAND:"CREATE_BRAND",
        CREATE_BANNER:"CREATE_BANNER",
    }
    const handleOpenModal=()=>{
        setOpen(true);
    }
    const handleCloseModal=()=>{
        setOpen(false);
    }
    const handleToggleChildren=(type)=>{
        if(type===OPEN_MODAL_TYPE.CREATE_PRODUCT){
            setOpenCreateProduct(true);
            setOpenCreateCategory(false);
            setOpenCreateBanner(false);
            setOpenCreateBrand(false);
            handleOpenModal()
            setTitle("Create a product")
        }
        if(type===OPEN_MODAL_TYPE.CREATE_CATEGORY){
            setOpenCreateProduct(false);
            setOpenCreateCategory(true);
            setOpenCreateBanner(false);
            setOpenCreateBrand(false);
            handleOpenModal()
            setTitle("Create a category")

        }
        if(type===OPEN_MODAL_TYPE.CREATE_BANNER){
            setOpenCreateProduct(false);
            setOpenCreateCategory(false);
            setOpenCreateBanner(true);
            setOpenCreateBrand(false);
            handleOpenModal()
            setTitle("Create a banner")

        }
        if(type===OPEN_MODAL_TYPE.CREATE_BRAND){
            setOpenCreateProduct(false);
            setOpenCreateCategory(false);
            setOpenCreateBanner(false);
            setOpenCreateBrand(true);
            handleOpenModal()
            setTitle("Create a brand")
        }
    }

    return (
        <div>
            <h1 className="text-lg font-bold pb-5">Creator</h1>

            <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">

                <li
                    onClick={()=>handleToggleChildren(OPEN_MODAL_TYPE.CREATE_PRODUCT)}
                >

                    <Suspense fallback={<SkeletonCreatorCard />}>
                        <CreatorCard
                            Icon={AiFillProduct}
                            title="Create a product"
                        />
                    </Suspense>
                </li>

                <li
                    onClick={()=>handleToggleChildren(OPEN_MODAL_TYPE.CREATE_CATEGORY)}

                >
                    <Suspense fallback={<SkeletonCreatorCard />}>
                        <CreatorCard
                            Icon={BiSolidCategoryAlt}
                            title="Create a Category"
                        />
                    </Suspense>
                </li>

                <li

                    onClick={()=>handleToggleChildren(OPEN_MODAL_TYPE.CREATE_BRAND)}
                >
                    <Suspense fallback={<SkeletonCreatorCard />}>
                        <CreatorCard
                            Icon={TbBrandDebian}
                            title="Create a Brand"
                        />
                    </Suspense>
                </li>
                <li
                    onClick={()=>handleToggleChildren(OPEN_MODAL_TYPE.CREATE_BANNER)}
                >

                    <Suspense fallback={<SkeletonCreatorCard />}>
                        <CreatorCard
                            Icon={PiFlagBannerFill}
                            title="Create a Banner"
                        />
                    </Suspense>
                </li>
            </ul>

            <Suspense fallback={<Loader/>}>
                <AdminDashboardModal
                    isOpen={open}
                    setOpen={setOpen}
                    handleCloseModal={handleCloseModal}
                    title={title}
                >
                    {
                        openCreateProduct&&<CreateProductForm categories={categories} brands={brands} />

                    }
                    {
                        openCreateCategory&&<CreateCategoryForm categoriesMenu={categoriesMenu}/>
                    }
                    {
                        openCreateBrand&&<CreateBandForm/>
                    }
                    {
                        openCreateBanner&&<CreateBannerForm/>
                    }
                </AdminDashboardModal>
            </Suspense>
        </div>
    );
};

export default CreatorLayout;