import axios from "axios";
import API_BASE_URL from "../API_BASE_URL/API_BASE_URL";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";


const getProducts = async (filter) => {
    try {
        const products = await axios.get(`${API_BASE_URL}/api/products/all-products${filter || ""}`, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'axios/1.6.8'
            }
        });


        return new Promise((resolve) =>
            setTimeout(() => {
                resolve(products?.data)
            }, 1000)
        )
    } catch (error) {
        if (isDynamicServerError(error)) {
            throw error;
        }
    }
}
export default getProducts;