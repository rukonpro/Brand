import React from 'react';
import CreateProductForm from "@/app/components/AdminDashboard/creatore/CreateProductForm";
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";
import {getBrands} from "@/app/utils/brand/fetch_brand_api";

const CreateProduct =async () => {
    const [allCategory,brands]=await Promise.all([getAllCategory({
        children:true
    }),getBrands()])
    return (
        <div>
            <CreateProductForm categories={allCategory?.data} brands={brands?.data}/>
        </div>
    );
};

export default CreateProduct;