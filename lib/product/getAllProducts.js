const getProduct = async (filter) => {

    const products = await fetch(`${process.env.HOST_URL}/products/all-products${filter || ""}`);
    return products.json()
}
export default getProduct;