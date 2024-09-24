"use client"
import React, {useCallback, useEffect, useState} from 'react';
import SavedForLaterCard from "@/app/components/SavedForLaterCard/SavedForLaterCard";
import getSavedProductsFromCookies from "@/app/components/SavedForLaterItems/getSavedProductsFromCookies";
import {getProducts} from "@/app/utils/product/fetch_products_api";
import Loading from "@/app/loading";


const SavedForLaterItems = () => {
const [products, setProducts] = React.useState([]);
const [loading,setLoading] = useState(false);
    const productIds = products?.map(item => item.id).join(',');

    const params = {
        limit: 10,
        page: 1,
        productIds: productIds
    }


    const getHandler=()=>{
        const savedProducts = getSavedProductsFromCookies();
        setProducts(savedProducts);
    }
    useEffect(() => {
        getHandler()
    }, []);



    const handleGetProducts=useCallback(async ()=>{
        setLoading(true)
        if(productIds){
            const products= await getProducts(params);
            setProducts(products?.data);
        }

        setLoading(false);
    },[productIds,setProducts])


    useEffect(()=>{
        handleGetProducts()
    },[handleGetProducts]);

    return loading?<Loading/>: (
        <div className="lg:bg-white md:p-3 mt-10 md:rounded-r-lg dark:bg-slate-800">
            <h1 className="text-xl font-bold text-gray-600 pb-5 px-3 md:px-0 dark:text-slate-200">Saved for later</h1>
            <div>
                { products.length>0 ?<ol
                    className="grid grid-cols-2  sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-0.5 md:gap-1 lg:gap-2">
                    {
                        products?.map((product) => {
                            return (
                                <li key={product?.id}>

                                    <SavedForLaterCard product={product} getHandler={getHandler}/>

                                </li>
                            )
                        })
                    }
                </ol>:
                <div className="h-56 flex justify-center items-center">
                    <h1 className="text-red-500 text-lg">Save product not found, Please save for later.</h1>
                </div>
                }
            </div>
        </div>
    );
};

export default SavedForLaterItems;