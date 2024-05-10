import axios from "axios";
import toast from "react-hot-toast";

export const userLogin = async ({email,password}) => {
    const user=   await axios.post("/api/users/signin", {email,password});
    return user;
}

export const userSignup=async ({name,email,password})=>{
    const user=await axios.post("/api/users/signup",{name,email,password});
    return user;
}

export const getMe=async ()=>{
        const user=await axios.get("/api/users/me");
        return user;
}



export const handleLogout= async ()=>{
    try {
        await axios.get('/api/users/signout');
        toast.success("Logout success",{id:"logout"});
    } catch (error) {
        toast.error(error.message,{id:"logout"})
        alert(error.message);
    }
}