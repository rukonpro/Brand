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


const CategoriesItems = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [category, setCategory] = useState({});

    const {
        data: categories,
        error: errorCategories,
        isLoading: isLoadingCategories,
        mutate
    } = useSWR('/api/category/findMany', fetcher);



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
        if(res?.status===200){
            toast.success("Update Category sucessfully!");
            mutate();
        }else{
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
            <div className="grid grid-cols-1 sm:grid-cols-[250px_1fr] min-h-screen transition-all duration-700 relative">
                <div className="hidden sm:block">

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




                <div className="flex-1  grid-rows-[auto_1fr]">
                    <div className="flex justify-between items-center p-3 pb-6">
                        <h1 className="text-lg font-bold  ">

                            {category?.name || "All categories"}
                        </h1>
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