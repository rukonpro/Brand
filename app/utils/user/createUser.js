import axios from "axios";
import baseURL from "@/app/utils/baseURL";


export const createUser=async(data)=>{
    try {
        return await axios.post(`${baseURL}/api/user/create`,data);
    }catch (error) {
        return {error};
    }
}