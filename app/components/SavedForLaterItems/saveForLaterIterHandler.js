import Cookies from 'js-cookie';
import toast from "react-hot-toast";

const saveProductToCookies = (product) => {
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
    // Check if the product is already in the list
    if (!savedProducts.find(p => p?.id === product?.id)) {
        // Add the new product to the list
        savedProducts.push({id:product?.id});
        // Serialize the updated list and save it back to cookies
        Cookies.set('saved-products', JSON.stringify(savedProducts), { expires: 30 }); // Expires in 10 days
    }else {
        toast.error('Already have saved this product',{
            id:"saved-products",
        })
    }
};
export default saveProductToCookies;