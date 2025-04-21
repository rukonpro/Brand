import axios from "axios";
import baseURL from "@/app/utils/baseURL";

export const getAllCategory= async (params)=> {

    try {

        const url =await new URL(`${baseURL}/api/category/findMany`);
        if (params) {
            Object.entries(params).forEach(([key, value]) =>
                url.searchParams.append(key, value.toString())
            );
        }

        const res = await fetch(url.toString(), {
            cache: 'no-store', // ensures SSR (no caching)
        });

        return {
            data: await res.json()
        };

    } catch (error) {
        return {
            error
        }
    }
}

export const getCategoryById= async (id)=> {
    try {
        const res = await fetch(`${baseURL}/api/category/${id}/details`,{
            cache: 'no-store',
        });
        return {
            data: await res.json()
        }

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