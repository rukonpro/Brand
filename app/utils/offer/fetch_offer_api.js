import axios from "axios";
import baseURL from "@/app/utils/baseURL";
import {cache} from "react";

export const getOffers = cache(async (params)=>{
    try {
        return await axios.get(`${baseURL}/api/offer/findMany`,{
            params:params
        });
    }catch(error){
      return {error};
    }
});