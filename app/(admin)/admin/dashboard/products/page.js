import React from 'react';
import ProductsTable from "@/app/components/AdminDashboard/Products/ProductsTable";
import {getProducts} from "@/app/utils/product/fetch_products_api";

const products =async () => {
    const products= await getProducts();
    return (
        <div className="overflow-auto">
            <ProductsTable  products={products?.data}/>
        </div>
    );
};

export default products;