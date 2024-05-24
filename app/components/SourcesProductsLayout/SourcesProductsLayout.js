import React from 'react';
import SourcesProducts from "@/app/components/SourceProducts/SourcesProducts";
import checkEnvironment from '@/lib/fetcher/checkEnvironment';




const SourcesProductsLayout = async () => {

    const res = await fetch(checkEnvironment().concat("/api/category/all-category"));
    const catagorys = await res.json()

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