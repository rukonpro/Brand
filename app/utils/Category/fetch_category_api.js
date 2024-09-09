import axios from "axios";
import baseURL from "@/app/utils/baseURL";

export const getAllCategory= async (prams)=> {
    try {
        return await axios.get(`${baseURL}/api/category/findMany`,{
            params:prams,
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