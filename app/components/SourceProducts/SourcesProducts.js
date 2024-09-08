import React from 'react';
import SourceCard from "@/app/components/SourceProducts/SourceCard";
import Link from "next/link";
import SourceProductCard from "@/app/components/SourceProducts/SourceProductCard";
import axios from "axios";
import baseURL from "@/app/utils/baseURL";





const getProducts= async ({categoryId})=>{
       try {
           return await axios.get(`${baseURL}/api/product/findMany`,{
               params:{
                   categoryId:categoryId
               }
           });
       }catch(error){
           console.log(error);
       }
}

const SourcesProducts = async ({ category }) => {

    const searchParams = {
        categoryId: category?.id,
        limit: 10,
        page: 1
    }
    const products = await getProducts(searchParams);



    return (

        <div className="sm:px-3">
            <div className='max-w-[1200px] mx-auto mt-5'>
                <div
                    className='grid grid-cols-12  border-2 border-gray-200 sm:rounded-lg gap-[2px] bg-gray-200 overflow-hidden'>
                    <div className="md:col-span-3 col-span-12 bg-white">
                        <SourceCard
                            id={category?.id}
                            photo={category?.photo}
                            name={category?.name} />
                    </div>
                    <div className='grid md:grid-cols-5 grid-cols-2 md:col-span-9 col-span-12 gap-[2px]'>
                        {
                            products?.data.map((product) => {
                                return (
                                    <div key={product.id} className='bg-white'>
                                        <Link href={`/details/${product.id}`}>
                                            <SourceProductCard product={product} />
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SourcesProducts;