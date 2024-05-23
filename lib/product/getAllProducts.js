const getProduct = async (filter) => {
    
    const products = await fetch(`http://localhost:3000/api/products/all-products${filter||""}`);
    return products.json()
}
export default getProduct;