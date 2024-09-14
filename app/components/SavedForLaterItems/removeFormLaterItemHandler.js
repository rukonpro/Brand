import Cookies from 'js-cookie';

// Function to remove a product from cookies
const removeProductFromCookies = (id) => {
    // Retrieve the existing list of products from cookies
    const savedProductsString = Cookies.get('saved-products');
    let savedProducts = [];

    if (savedProductsString) {
        try {
            // Parse the JSON string to an array of objects
            savedProducts = JSON.parse(savedProductsString);
        } catch (e) {
            console.error('Failed to parse saved products:', e);
        }
    }

    // Remove the product with the specified ID
    savedProducts = savedProducts.filter(p => p.id !== id);

    // Save the updated list back to cookies
    Cookies.set('saved-products', JSON.stringify(savedProducts), { expires: 10 }); // Expires in 10 days
};

// Example usage
export default removeProductFromCookies;
