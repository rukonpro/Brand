import axios from "axios";
import baseURL from "@/app/utils/baseURL";


export const updateUser=async(id,data)=>{
    try {
        return await axios.patch(`${baseURL}/api/user/${id}`,data);
    }catch (error) {
        return error;
    }
}