import axios from "axios";
import API_BASE_URL from "../API_BASE_URL/API_BASE_URL";

const getProducts = async (filter) => {
    const products = await axios.get(`${API_BASE_URL}/api/products/all-products${filter || ""}`);

    return products?.data;
}
export default getProducts;