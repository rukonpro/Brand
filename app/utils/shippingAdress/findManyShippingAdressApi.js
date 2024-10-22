import axios from "axios";
import baseURL from "@/app/utils/baseURL";


export const create_sipping_address = async (params) => {

    try {
        return await axios.get(`${baseURL}/api/shippingAddress/findMany`, {
            params: params
        });

    } catch (error) {

        return error;
    }
}
export default create_sipping_address;