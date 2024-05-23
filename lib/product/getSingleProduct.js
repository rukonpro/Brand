const getSingleProduct = async (id) => {

    const product = await fetch(`${process.env.HOST_URL_LOCAL || process.env.HOST_URL_SERVER}/products/single-product/${id}`);
    return product.json()
}
export default getSingleProduct;