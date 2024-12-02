import axios from "axios";

const API_URI = "https://signup-4xzw.onrender.com"

export const registerUser = async (userData) =>{
    try{
        const response = await axios.post(`${API_URI}/register`,userData)
        return response;
}catch(error){
    throw error.response || "Registration failed";
}
}

export const loginUser = async (userData) =>{
    try{
        const response = await axios.post(`${API_URI}/login`,userData)
        return response;
    }catch(error){
        throw error.response || "Login Fail";
    }
}
