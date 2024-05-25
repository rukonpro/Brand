import axios from "axios";
import API_BASE_URL from "../API_BASE_URL/API_BASE_URL";


const getProducts = async (searchParams) => {

    try {
        const products = await axios.get(`${API_BASE_URL}/api/products/all-products`, {
            params: searchParams
        });

        return products?.data;
    } catch (error) {
        console.log(error)
    }
}
export default getProducts;