import React from 'react';
import ProductsTable from "@/app/components/AdminDashboard/Products/ProductsTable";
import {getProducts} from "@/app/utils/product/fetch_products_api";

const Page =async () => {
    const products= await getProducts();
    return (
        <div >
            <ProductsTable  products={products?.data}/>
        </div>
    );
};

export default Page;