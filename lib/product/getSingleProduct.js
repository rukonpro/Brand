import axios from "axios";
import API_BASE_URL from "../API_BASE_URL/API_BASE_URL";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";


const getSingleProduct = async (id) => {
    try {

        const product = await axios.get(`${API_BASE_URL}/api/products/single-product/${id}`, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'axios/1.6.8'
            }
        });

        return new Promise((resolve) =>
            setTimeout(() => {
                resolve(product?.data)
            }, 1000)
        )
    } catch (error) {
        if (isDynamicServerError(error)) {
            throw error;
        }
    }
}
export default getSingleProduct;