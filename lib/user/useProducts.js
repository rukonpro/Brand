import useSWR from "swr";
import fetcher from "../fetcher/fetcher";


export const useProducts = (filter) => {
    const { data, error, isLoading } = useSWR(`/api/products/all-products${filter || ""}`, fetcher);
    return {
        products: data?.products,
        isError: error,
        isLoading: isLoading
    }

}


export const useSingleProducts = (id) => {
    const { data, error, isLoading } = useSWR(`/api/products/single-product/${id}`, fetcher);
    return {
        product: data?.product,
        isError: error,
        isLoading: isLoading
    }

}






