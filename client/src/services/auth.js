// src/services/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:8001/api/auth';

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = async () => {
    const data = JSON.parse(localStorage.getItem("user"))
    const responce = await axios.get(`${API_URL}/user`, { headers : {
        Authorization: `Bearer ${data.token}`
    }})
    return responce.data;
};
