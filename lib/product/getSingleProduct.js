const getSingleProduct = async (id) => {

    const product = await fetch(`http://localhost:3000/api/products/single-product/${id}`);
    return product.json()
}
export default getSingleProduct;