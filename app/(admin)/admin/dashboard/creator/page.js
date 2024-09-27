import React from 'react';
import CreatorLayout from "@/app/components/AdminDashboard/creatore/CreatoreLayout";
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";
import {getBrands} from "@/app/utils/brand/fetch_brand_api";

const Creator =async () => {
    const [
        allCategory,
        categoriesMenu,
        brands
    ]=await Promise.all([getAllCategory({children:true}),getAllCategory(),getBrands()]);

    return (
        <>
            <CreatorLayout
                categories={allCategory?.data}
                categoriesMenu={categoriesMenu?.data}
                brands={brands?.data}/>
        </>
    );
};

export default Creator;