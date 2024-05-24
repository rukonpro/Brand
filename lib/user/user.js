import axios from "axios";
import toast from "react-hot-toast";

export const userLogin = async ({ email, password }) => {
    const user = await axios.post("/api/users/signin", { email, password });
    return user;
}

export const userSignup = async ({ name, email, password }) => {
    const user = await axios.post("/api/users/signup", { name, email, password });
    return user;
}

export const getMe = async () => {
    const user = await axios.get("/api/users/me");
    return user;
}



export const handleLogout = async () => {
    try {
        await axios.get('/api/users/signout');
        toast.success("Logout success", { id: "logout" });
    } catch (error) {
        toast.error(error.message, { id: "logout" })
    }
}


export const updateUser = async (userData) => {

    try {
        const user = await axios.patch("/api/users/update", userData);
        toast.success(user?.data?.message, { id: "update" })
    } catch (error) {
        toast.error(error.message, { id: "update" })
    }

}

export const getAllUsers = async () => {

    try {
        const users = await axios.get("/api/users/getAllUser");
        return users
    } catch (error) {
        console.log(error.message)
    }

}
