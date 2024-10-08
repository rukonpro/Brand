import React, { Suspense } from 'react';
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";
import CategoriesItems from "@/app/components/AdminDashboard/Categories/CategoriesItems";
import Loader from '@/app/Loader';



const Categories =async ({searchParams}) => {
    const {parentId,name} = searchParams;
    const [categories]= await Promise.all([getAllCategory({parentId})]);

    return (
        <Suspense fallback={<Loader/>}>
            <CategoriesItems categories={categories?.data} name={name}/>
        </Suspense>
    );
};

export default Categories;