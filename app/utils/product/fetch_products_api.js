import axios from "axios";
import baseURL from "@/app/utils/baseURL";


export const getProducts = async (params)=>{
    try {
        return await axios.get(`${baseURL}/api/product/findMany`,{
            params:params
        });
    }catch(error){
       return {error}
    }
};



export const getDetailsProduct= async ({id})=>{
    try {
        return await axios.get(`${baseURL}/api/product/${id}/details`)
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




