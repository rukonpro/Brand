import axios from "axios";
import API_BASE_URL from "../API_BASE_URL/API_BASE_URL";


const getSingleProduct = async (id) => {

    const product = await axios.get(`${API_BASE_URL}/api/products/single-product/${id}`);
    return product?.data;
}
export default getSingleProduct;