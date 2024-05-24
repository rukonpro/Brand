import React from 'react';
import SourcesProducts from '../SourceProducts/SourcesProducts';
import { getAllCategory } from '@/lib/category/category';
import API_BASE_URL from '@/lib/API_BASE_URL/API_BASE_URL';




const SourcesProductsLayout = async () => {
    if (!API_BASE_URL) {
        return null
    }

    const categorys = await getAllCategory()


    return (
        <div>
            {
                categorys?.categorys?.map((category, index) => {
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


