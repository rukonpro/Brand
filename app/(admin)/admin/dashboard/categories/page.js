import React from 'react';
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";
import CategoriesItems from "@/app/components/AdminDashboard/Categories/CategoriesItems";



const Categories =async ({searchParams}) => {
    const {parentId,name} = searchParams;
    const [categories]= await Promise.all([getAllCategory({parentId})]);

    return (
        <div>
            <CategoriesItems categories={categories?.data} name={name}/>
        </div>
    );
};

export default Categories;