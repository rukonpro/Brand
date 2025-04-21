
import axios from "axios";
import baseURL from "@/app/utils/baseURL";


export const getProducts = async (params)=>{
    try {
        const url =await new URL(`${baseURL}/api/product/findMany`);
        if (params) {
            Object.entries(params).forEach(([key, value]) =>
                url.searchParams.append(key, value.toString())
            );
        }

        const res = await fetch(url.toString(), {
            cache: 'no-store', // ensures SSR (no caching)
        });

        return {
            data: await res.json()
        };
    } catch (error) {
        return { error };
    }
};



export const getDetailsProduct= async ({id})=>{
    try {
        const res = await fetch(`${baseURL}/api/product/${id}/details`,{
            cache: 'no-store',
        });
        return {
            data: await res.json()
        }
    }catch (error) {
       return {error}
    }
}




export const createProduct= async (data)=>{
    try {
        return await axios.post(`${baseURL}/api/product/create`, data);
    }catch (error) {
        return {error}
    }
}




export const updateProduct= async ({productId,updateData})=>{
    try {
        return await axios.patch(`${baseURL}/api/product/${productId}/update`, updateData);
    }catch (error) {
        return {error}
    }
}