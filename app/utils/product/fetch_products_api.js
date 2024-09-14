import axios from "axios";
import baseURL from "@/app/utils/baseURL";

export const getProducts = async (params)=>{
    try {
        return await axios.get(`${baseURL}/api/product/findMany`,{
            params:params
        });
    }catch(error){
        console.log(error);
    }
};



export const getDetailsProduct= async ({id})=>{
    try {
        return await axios.get(`${baseURL}/api/product/${id}/details`)
    }catch (e) {
        console.log(e)
    }
}





