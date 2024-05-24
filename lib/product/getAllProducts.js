import axios from "axios";

const getProducts = async (filter) => {
    const products = await axios.get(`/api/products/all-products${filter || ""}`);

    return products?.data;
}
export default getProducts;