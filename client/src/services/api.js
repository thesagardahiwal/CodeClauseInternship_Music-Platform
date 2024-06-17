// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/music';

export const getTracks = async (token) => {
    const response = await axios.get(`${API_URL}/tracks`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const fetchAccessToken = async () => {
    const responce = await axios.get(`${API_URL}/token`);
    localStorage.setItem("access-token", responce.data);
    return responce.data;
}

export const getRecommandation = async(accessToken, moodParams) => {
    const responce = await axios.post(`${API_URL}/recommendations`, { accessToken, moodParams })
    return responce.data;
}

export const getFreeTracks = async () => {
    const responce = await axios.get(`${API_URL}/free-tracks`);
    return responce.data;
}
