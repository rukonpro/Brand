import axios from "axios";
import API_BASE_URL from "../API_BASE_URL/API_BASE_URL";


const getSingleProduct = async (id) => {

    const product = await axios.get(`${API_BASE_URL}/api/products/single-product/${id}`, {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'axios/1.6.8'
        }
    });
    return product?.data;
}
export default getSingleProduct;