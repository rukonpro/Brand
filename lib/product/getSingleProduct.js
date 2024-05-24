import checkEnvironment from "../fetcher/checkEnvironment";


const getSingleProduct = async (id) => {

    const product = await fetch(checkEnvironment().concat(`/api/products/single-product/${id}`));
    return await product.json();
}
export default getSingleProduct;