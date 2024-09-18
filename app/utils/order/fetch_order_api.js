import axios from "axios";
import baseURL from "@/app/utils/baseURL";

export const postOrder = async (data)=>{
    try {
        return await axios.post(`${baseURL}/api/order/create`,data);
    }catch(error){
      return error;
    }
};

export const getSingleOrder = async (params)=>{
    try {
        return await axios.get(`${baseURL}/api/order/details`,{
            params
        });
    }catch(error){
        return error;
    }
};

export const getOrderMany = async (params)=>{
    try {
        return await axios.get(`${baseURL}/api/order/findMany`,{
            params
        });
    }catch(error){
        return error;
    }
};