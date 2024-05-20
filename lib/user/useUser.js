import useSWR from "swr";
import fetcher from "../fetcher/fetcher";


const useUser = () => {
    const { data, error, isLoading } = useSWR(`/api/users/me`, fetcher);
    return {
        user: data?.data,
        isError: error,
        isLoading: isLoading
    }

}

export default useUser;