import React, {Suspense} from 'react';
import SourcesProducts from '../SourceProducts/SourcesProducts';
import Loader from "@/app/Loader";
import {getAllCategory} from "@/app/utils/Category/fetch_category_api";


const SourcesProductsLayout = async () => {
       const allCategory = await getAllCategory();
    return (
        <div>
            {
                allCategory?.data?.map((category) => {
                    return (
                        <Suspense fallback={<Loader/>} key={category?.id}>
                            <SourcesProducts
                                category={category}
                            />
                        </Suspense>

                    )
                })
            }


        </div>
    );
};

export default SourcesProductsLayout;


