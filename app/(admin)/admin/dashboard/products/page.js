import React from 'react';
import ProductsTable from "@/app/components/AdminDashboard/Products/ProductsTable";
import {getProducts} from "@/app/utils/product/fetch_products_api";
import {getBrands} from "@/app/utils/brand/fetch_brand_api";
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";

const products =async () => {
    const [products,brands,categories]= await Promise.all([getProducts(),getBrands(),getAllCategory()]);


    return (
        <div className="overflow-auto">
            <ProductsTable
                products={products?.data}
                brands={brands?.data}
                categories={categories?.data}/>
        </div>
    );
};

export default products;