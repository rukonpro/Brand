import React from 'react';
import SourcesProducts from "@/app/components/SourceProducts/SourcesProducts";
import fakeData from "@/app/FakeData/FakeData";
import { getAllCategory } from '@/lib/category/category';



const SourcesProductsLayout = async () => {
    const catagorys = await getAllCategory();

    return (
        <div>
            {
                catagorys?.categorys?.map((category, index) => {
                    return (
                        <SourcesProducts
                            key={index}
                            category={category}
                        />
                    )
                })
            }
        </div>
    );
};

export default SourcesProductsLayout;