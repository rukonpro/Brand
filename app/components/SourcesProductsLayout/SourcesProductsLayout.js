import React, {Suspense} from 'react';
import SourcesProducts from '../SourceProducts/SourcesProducts';
import axios from "axios";
import Loading from "@/app/loading";
import baseURL from "@/app/utils/baseURL";




export const getAllCategory= async ()=> {
    try {
        return await axios.get(`${baseURL}/api/category/findMany`);
    } catch (error) {
        console.log(error);
    }
}


const SourcesProductsLayout = async () => {
   
    const allCategory = await getAllCategory()

    return (
        <div>
            {
                allCategory?.data?.map((category) => {
                    return (
                        <Suspense fallback={<Loading/>}  key={category?.id}>
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


