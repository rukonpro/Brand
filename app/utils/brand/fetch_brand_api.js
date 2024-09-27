import axios from "axios";
import baseURL from "@/app/utils/baseURL";

export const getBrands = async (params)=>{
    try {
        return await axios.get(`${baseURL}/api/brand/findMany`,{
            params:params
        });
    }catch(error){
      return {error};
    }
};

export const createBrand = async (data)=>{
    try {
        return await axios.post(`${baseURL}/api/brand/create`,data);
    }catch(error){
        return {error};
    }
};