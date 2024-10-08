"use client"
import React, { Suspense, useState } from 'react';
import BackButton from "@/app/components/BackButtons/BackButton";
import CategoriesCard from "@/app/components/AdminDashboard/Categories/CategoriesCard";
import NotFoundPhoto from "@/public/images/not-found.png"
import Image from "next/image";
import CategoryManuAdmin from "@/app/components/AdminDashboard/creatore/CategoryMenuAdmin";
import Loader from '@/app/Loader';
import useSWR from 'swr';
import { fetcher } from '@/app/utils/fetcher/fetcher';
import AdminDashboardModal from '../../Drawer/AdminDashboardModal';
import CreateCategoryForm from './CategoryCreateForm';
import { createCategory, deleteCategory, updateCategory } from '@/app/utils/Category/fetch_category_api';
import toast from 'react-hot-toast';
import DeleteCategory from './CategoryDelete';
import CategoryUpdateForm from './CategoryUpdateForm';
import Drawer from '../../Drawer/Drawer';
import { FiAlignRight } from "react-icons/fi";
import Topbar from '../Topbar/Topbar';
import { FaXmark } from 'react-icons/fa6';

const CategoriesItems = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [category, setCategory] = useState({});
    const [isDrawerOpen, setDropdownOpen] = useState(false);

    const {
        data: categories,
        error: errorCategories,
        isLoading: isLoadingCategories,
        mutate
    } = useSWR('/api/category/findMany', fetcher);

    const handleToggleDrawer = () => {
        setDropdownOpen(!isDrawerOpen);
    };
    const handleClose = () => {
        setDropdownOpen(false);
    };


    const handleCloseModal = () => {
        setModalOpen(false);
        setModalTitle("");
        setCategoryId("");
    }


    const handleOpenModal = (modalTitle) => {
        setModalTitle(modalTitle);
        setModalOpen(true)
    }



    const handleCreateCategory = async ({ values, resetForm }) => {
        values.parentId = categoryId;
        const res = await createCategory(values);

        if (res?.status === 201) {
            toast.success("Create a category successfully!")
            mutate();
            resetForm();
            handleCloseModal()
        } else {
            toast.error("Internal problem, please try again!")
        }

    };

    const handleUpdateCategory = async ({ values }) => {

        const res = await updateCategory(categoryId, values);
        if (res?.status === 200) {
            toast.success("Update Category sucessfully!");
            mutate();
        } else {
            toast.error("Update category faild,please try again!");
        }


    };


    const handleDeleteCategory = async () => {
        const res = await deleteCategory(categoryId);

        if (res?.status === 200) {
            toast.success(res?.data?.message);
            handleCloseModal()
            mutate();
        } else {
            toast.error("Internal error,please try again!")
        }


    }

    return isLoadingCategories ? (<Loader title="Category Loading..." />) : (
        <div >
           
            <div className="block sm:hidden">
                <Drawer isDrawerOpen={isDrawerOpen} handleClose={handleClose} destination="left">
                    <Suspense fallback={<Loader />} >

                        <CategoryManuAdmin
                            categories={categories}
                            setCategory={setCategory}
                            categoryId={categoryId}
                            setCategoryId={setCategoryId}
                            handleOpenModal={handleOpenModal}
                            closeButton={  <button onClick={handleClose}><FaXmark size={25}/></button>}
                        />

                    </Suspense>
                </Drawer>
            </div>
            <div className=" relative">
                <div className="hidden sm:block fixed  bottom-0 top-0 w-60">

                    <Suspense fallback={<Loader />}>
                        <CategoryManuAdmin
                            categories={categories}
                            setCategory={setCategory}
                            categoryId={categoryId}
                            setCategoryId={setCategoryId}
                            handleOpenModal={handleOpenModal}
                            
                        />
                    </Suspense>
                </div>




                <div className="sm:ml-60">
                <Topbar />
                    <div className="flex justify-between items-center p-3 pb-6">

                        <div className="  flex gap-1 ">
                            <button type="button"
                                className='block sm:hidden'
                                onClick={handleToggleDrawer}
                            >
                                <FiAlignRight size={25} />
                            </button>

                            <h1 className="text-lg font-bold  ">

                                {category?.name || "All categories"}
                            </h1>
                        </div>

                        <BackButton title="Back" />
                    </div>



                    {!category?.id && <ul
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-3 gap-0.5 sm:px-3 px-0">
                        {categories?.length > 0 ? categories?.map((category) => (
                            <li
                                key={category.id}>
                                <Suspense fallback={<Loader />}>
                                    <CategoriesCard
                                        category={category}
                                        handleOpenModal={handleOpenModal}
                                        setCategoryId={setCategoryId}
                                    />
                                </Suspense>
                            </li>
                        )) :
                            <li className="flex justify-center items-center col-span-full">
                                <div>
                                    <Image src={NotFoundPhoto} alt="not found photo" />
                                </div>
                            </li>
                        }
                    </ul>}



                    {category?.id && <ul
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 sm:gap-3 gap-0.5 sm:px-3 px-0">

                        {
                            !category?.children &&
                            <li>
                                <Suspense fallback={<Loader />}>
                                    <CategoriesCard
                                        category={category}
                                        handleOpenModal={handleOpenModal}
                                        setCategoryId={setCategoryId}
                                    />
                                </Suspense>

                            </li>
                        }



                        {category?.children?.length > 0 ? category?.children?.map((category) => (
                            <li
                                key={category.id}>
                                <Suspense fallback={<Loader />}>
                                    <CategoriesCard
                                        category={category}
                                        handleOpenModal={handleOpenModal}
                                        setCategoryId={setCategoryId}
                                    />
                                </Suspense>
                            </li>
                        )) :
                            <li>
                                <Suspense fallback={<Loader />}>
                                    <CategoriesCard
                                        category={category}
                                        handleOpenModal={handleOpenModal}
                                        setCategoryId={setCategoryId}
                                    />
                                </Suspense>

                            </li>
                        }
                    </ul>}

                </div>
            </div>

            <Suspense fallback={<Loader />}>
                <AdminDashboardModal
                    isOpen={modalOpen}
                    setOpen={setModalOpen}
                    handleCloseModal={handleCloseModal}
                    title={modalTitle}
                >
                    {
                        modalTitle === "Create Category" && <CreateCategoryForm handleCreateCategory={handleCreateCategory} />
                    }
                    {
                        modalTitle === "Delete Category" && <DeleteCategory handleDeleteCategory={handleDeleteCategory} category={category} />
                    }

                    {
                        modalTitle === "Update Category" && <CategoryUpdateForm handleUpdateCategory={handleUpdateCategory} category={category} />
                    }
                </AdminDashboardModal>
            </Suspense>
        </div>
    );
};

export default CategoriesItems;

