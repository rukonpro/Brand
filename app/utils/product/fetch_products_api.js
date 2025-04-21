
import axios from "axios";
import baseURL from "@/app/utils/baseURL";


export const getProducts = async (params)=>{
    try {
        return await axios.get(`${baseURL}/api/product/findMany`,{
            params:params,
            headers:{
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                Expires: '0',
            }
        });
    }catch(error){
       return {error}
    }
};



export const getDetailsProduct= async ({id})=>{
    try {
        const response = await axios.get(`${baseURL}/api/product/${id}/details`, {
            headers: {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                Expires: '0',
            },
        });
        return { data: response.data };
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