import checkEnvironment from "../fetcher/checkEnvironment";

const getProduct = async (filter) => {
    const res = await fetch(checkEnvironment().concat(`/api/products/all-products${filter || ""}`));
    const products = await res.json()

    return products;
}
export default getProduct;