import axios from "axios";
import baseURL from "@/app/utils/baseURL";


export const updateDefaultShppingAddress_Api = async (data) => {
  
    try {
        return await axios.patch(`${baseURL}/api/shippingAddress/updateDefualtShippingAddress`, data,);
    } catch (error) {

        return error;
    }


}
export default updateDefaultShppingAddress_Api;