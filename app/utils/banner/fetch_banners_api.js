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

export const createBanner= async (data)=> {
    try {
        return await axios.post(`${baseURL}/api/banner/create`,data);
    } catch (error) {
        console.log(error);
    }
}
