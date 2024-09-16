import axios from "axios";
import baseURL from "@/app/utils/baseURL";


export const create_sipping_address=async(data)=>{

    try {
        return await axios.post(`${baseURL}/api/shippingAddress/create`,data,);

    }catch (error) {
        console.log(error);
        return error;
    }
}
export default create_sipping_address;