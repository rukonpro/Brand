import axios from "axios";
import baseURL from "@/app/utils/baseURL";

export const getAllCategory= async (params)=> {
    try {
        return await axios.get(`${baseURL}/api/category/findMany`,{
            params:params,
        });
    } catch (error) {
        return {
            error
        }
    }
}

export const getCategoryById= async (id)=> {
    try {
        return await axios.get(`${baseURL}/api/category/${id}/details`);
    } catch (error) {
        return {
            error
        }
    }
}

export const createCategory= async (data)=> {
    try {
        return await axios.post(`${baseURL}/api/category/create`,data);
    } catch (error) {
        return {
            error
        }
    }
}

export const deleteCategory= async (id)=> {
    try {
        return await axios.delete(`${baseURL}/api/category/${id}/delete`);
    } catch (error) {
        return {
            error
        }
    }
}

export const updateCategory= async (id,data)=> {
    try {
        return await axios.patch(`${baseURL}/api/category/${id}/update`,data);
    } catch (error) {
        return {
            error
        }
    }
}