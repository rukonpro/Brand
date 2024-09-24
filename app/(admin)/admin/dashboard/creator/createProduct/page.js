import React from 'react';
import CreateProductForm from "@/app/components/AdminDashboard/creatore/CreateProductForm";
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";

const CreateProduct =async () => {
    const [allCategory]=await Promise.all([getAllCategory()])
    return (
        <div>
            <CreateProductForm categories={allCategory?.data}/>
        </div>
    );
};

export default CreateProduct;