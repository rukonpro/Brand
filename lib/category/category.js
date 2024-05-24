import axios from "axios";
import API_BASE_URL from "../API_BASE_URL/API_BASE_URL";



export const getAllCategory = async () => {
    const catagorys = await axios.get(`${API_BASE_URL}/api/category/all-category`);
    return await catagorys.data;
}