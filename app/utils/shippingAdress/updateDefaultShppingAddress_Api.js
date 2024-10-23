import axios from "axios";
import baseURL from "@/app/utils/baseURL";

import { getSession, getCsrfToken } from 'next-auth/react';

export const updateDefaultShppingAddress_Api = async (data) => {
    // First check if the session exists
    const session = await getSession();

    // If no session, return or throw error
    if (!session) {
        throw new Error("Unauthorized: No session found");
    }

    // Now fetch the CSRF token
    const csrfToken = await getCsrfToken();


    if (!csrfToken) {
        throw new Error("CSRF token not found");
    }

    try {
        return await axios.patch(`${baseURL}/api/shippingAddress/updateDefualtShippingAddress`, {
            ...data,
            csrfToken: csrfToken // Include the CSRF token here
        });
    } catch (error) {
        return error;
    }
};
export default updateDefaultShppingAddress_Api;