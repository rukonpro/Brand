const getSingleProduct = async (id) => {

    const product = await fetch(`${process.env.HOST_URL}/products/single-product/${id}`);
    return product.json()
}
export default getSingleProduct;