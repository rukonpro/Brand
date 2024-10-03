import Catalogs from './Catalogs';
import React from "react";
import {getProducts} from "@/app/utils/product/fetch_products_api";

export const metadata = {
    title: "Catalog - Brand",
    description: "Browse the comprehensive catalog of products at Brand. From the latest trends to essential items, discover everything you need in one convenient location. Shop now and enjoy exclusive offers!",
    keywords: "catalog, product catalog, online shopping, fashion, electronics, Brand",
    openGraph: {
        title: "Catalog - Brand",
        description: "Browse the comprehensive catalog of products at Brand. From the latest trends to essential items, discover everything you need in one convenient location. Shop now and enjoy exclusive offers!",
        url: "https://brand-rukon.vercel.app/catalog", // Adjust the URL if necessary
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Catalog - Brand",
        description: "Browse the comprehensive catalog of products at Brand. From the latest trends to essential items, discover everything you need in one convenient location. Shop now and enjoy exclusive offers!",
    },
};


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