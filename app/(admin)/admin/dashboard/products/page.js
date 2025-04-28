import React from 'react';
import ProductsTable from "@/app/components/AdminDashboard/Products/ProductsTable";
import {getBrands} from "@/app/utils/brand/fetch_brand_api";
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";
import Topbar from '@/app/components/AdminDashboard/Topbar/Topbar';

const products =async () => {
    const [brands,categories]= await Promise.all([getBrands(),getAllCategory()]);

    return (
        <div >
             <Topbar />
            <div>
            <ProductsTable
                brands={brands?.data}
                categories={categories?.data}/>
            </div>
        </div>
    );
};

export default products;