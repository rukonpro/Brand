import axios from "axios";
import baseURL from "@/app/utils/baseURL";

export const getAllCategory= async (params)=> {
    try {
        return await axios.get(`${baseURL}/api/category/findMany`,{
            params:params,
        });
    } catch (error) {
        console.log(error);
    }
}

export const getCategoryById= async (id)=> {
    try {
        return await axios.get(`${baseURL}/api/category/${id}/details`);
    } catch (error) {
        console.log(error);
    }
}