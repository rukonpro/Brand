import Cookies from 'js-cookie';

// Function to get saved products from cookies
const getSavedProductsFromCookies = () => {
    const savedProductsString = Cookies.get('saved-products');
    if (savedProductsString) {
        try {
            return JSON.parse(savedProductsString);
        } catch (e) {
            console.error('Failed to parse saved products:', e);
            return [];
        }
    } else {
        return [];
    }
};
export default getSavedProductsFromCookies;