import axios from "axios";

export const userLogin = async ({email,password}) => {
    const user=   await axios.post("/api/users/signin", {email,password});
    return user;
}

export const userSignup=async ({name,email,password})=>{
    const user=await axios.post("api/users/signup",{name,email,password});
    return user;
}