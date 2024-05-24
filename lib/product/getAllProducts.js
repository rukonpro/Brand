import axios from "axios";
import API_BASE_URL from "../API_BASE_URL/API_BASE_URL";


const getProducts = async (filter) => {
    try {
        const products = await axios.get(`${API_BASE_URL}/api/products/all-products${filter || ""}`, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'axios/1.6.8'
            }
        });

        return products?.data;
    } catch (error) {

    }
}
export default getProducts;