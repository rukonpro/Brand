import Catalogs from './Catalogs';
import React from "react";
import { getProducts } from "@/app/utils/product/fetch_products_api";
import { getBrands } from '../utils/brand/fetch_brand_api';
import { getAllCategory } from '../utils/Category/fetch_category_api';

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


const Catalog = async ({ searchParams }) => {

    const { categoryName } = searchParams;
    const params = {
        page: 1,
        pageSize: 10,
        categoryName
    }

    const [products, categories, brands] = await Promise.all([getProducts(params), getAllCategory(), getBrands()]);

    return (
        <Catalogs products={products?.data} categories={categories?.data} brands={brands?.data} />
    );
};

export default Catalog;