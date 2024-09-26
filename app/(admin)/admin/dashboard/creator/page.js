import React from 'react';
import CreatorLayout from "@/app/components/AdminDashboard/creatore/CreatoreLayout";
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";
import {getBrands} from "@/app/utils/brand/fetch_brand_api";

const Creator =async () => {
    const [allCategory,brands]=await Promise.all([getAllCategory({children:true}),getBrands()])
    return (
        <>
            <CreatorLayout categories={allCategory?.data} brands={brands?.data}/>
        </>
    );
};

export default Creator;