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