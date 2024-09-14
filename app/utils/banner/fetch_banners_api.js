import axios from "axios";
import baseURL from "@/app/utils/baseURL";

export const getBanners= async (params)=> {
    try {
        return await axios.get(`${baseURL}/api/banner/findMany`,{
            params:params,
        });
    } catch (error) {
        console.log(error);
    }
}