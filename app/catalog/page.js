import Catalogs from './Catalogs';
import React from "react";
import {getProducts} from "@/app/utils/product/fetch_products_api";


const Catalog = async () => {

   const params={
       page: 1,
       pageSize: 10,
   }
  const products = await getProducts(params);


    return (
        <Catalogs products={products?.data}/>
    );
};

export default Catalog;