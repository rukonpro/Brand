
import axios from "axios";
import baseURL from "../baseURL";

export const addtoCartApi = async (data) => {
    try {
        return await axios.post(`${baseURL}/api/cart/addToCart`, data);
    } catch (error) {
        return error;
    }
};

export const getCartApi = async (userId) => {
    try {
        return await axios.get(`${baseURL}/api/cart/${userId}/getCart`);
    } catch (error) {
        return error;
    }
};

export const deleteSingleCartItemApi = async (params) => {
  
    try {
        return await axios.delete(`${baseURL}/api/cart/geleteSingleItem`, {
            params: params
        });
    } catch (error) {
        return error;
    }
};