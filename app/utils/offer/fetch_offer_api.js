import axios from "axios";
import baseURL from "@/app/utils/baseURL";

export const getOffers = async (params)=>{
    try {
        return await axios.get(`${baseURL}/api/offer/findMany`,{
            params:params
        });
    }catch(error){
        console.log(error);
    }
};