import axios from 'axios';
import baseURL from "@/app/utils/baseURL";
import Cookies from 'js-cookie';

// Function to get the current user
async function getMe() {

    try {
        const response = await axios.get(`${baseURL}/api/user/me`);
        return response.data;
    } catch (error) {
        await Cookies.remove('next-auth.session-token');
        await Cookies.remove('next-auth.csrf-token');
      return null
    }
}

export default getMe