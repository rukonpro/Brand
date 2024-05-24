import useSWR from "swr";
import fetcher from "../fetcher/fetcher";


export const useCategorys = () => {
    const { data, error, isLoading } = useSWR(`/api/category/all-category`, fetcher);
    return {
        categorys: data?.categorys,
        isError: error,
        isLoading: isLoading
    }

}



