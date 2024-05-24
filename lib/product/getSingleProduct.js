import axios from "axios";


const getSingleProduct = async (id) => {

    const product = await axios.get(`/api/products/single-product/${id}`);
    return product?.data;
}
export default getSingleProduct;