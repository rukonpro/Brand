import axios from "axios";



export const getAllCategory = async () => {
    const catagorys = await axios.get(`/api/category/all-category`);

    return await catagorys.data;
}