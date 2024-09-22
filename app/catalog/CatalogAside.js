import React from 'react';
import CatalogAsideManu from "@/app/catalog/CatalogAsideMenu";
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";
import {getBrands} from "@/app/utils/brand/fetch_brand_api";

const CatalogAside =async () => {
    const [categories,brands]=await Promise.all([getAllCategory(),getBrands()]);

    return (
        <aside className=" col-span-4 bg-white p-3 rounded-lg hidden md:block">
            <CatalogAsideManu categories={categories?.data}/>

        </aside>
    );
};

export default CatalogAside;