import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = async (formData) => {

    const response = await axios.post(
        `${API_URL}/auth/login`,
        formData
    );

    return response.data;
};

export const registerUser = async (formData) => {

    const response = await axios.post(
        `${API_URL}/auth/register`,
        formData
    );

    return response.data;
};