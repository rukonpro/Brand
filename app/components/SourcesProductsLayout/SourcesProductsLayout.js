import React from 'react';
import SourcesProducts from '../SourceProducts/SourcesProducts';
import { getAllCategory } from '@/lib/category/category';


const SourcesProductsLayout = async () => {
   
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


