import axios from 'axios';
import Cookies from 'js-cookie';
import baseURL from "@/app/utils/baseURL";


// Function to get the current user
async function getMe() {

    try {
        const token =await Cookies.get('token'); // Get the token from cookies
        if (!token) {
            return {
                error: 'Unauthorized, please login',
            }
        }

        const response = await axios.get(`${baseURL}/api/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Return user data
    } catch (error) {
        await  Cookies.remove('token');
        await Cookies.remove('user');

      return {
            error:error?.message,
      }
    }
}

export default getMe