import { getCurrentUser } from './auth';
import axios from 'axios';

const API_URL = 'http://localhost:8001/api/music';

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

export const getRecommandation = async (accessToken, moodParams) => {
    accessToken = await accessToken;
    let responce = await axios.post(`${API_URL}/recommendations`, { accessToken, moodParams })
    return responce.data;
    
}

export const getFreeTracks = async () => {
    const responce = await axios.get(`${API_URL}/free-tracks`);
    console.log(responce.data);
}

export const searchTracks = async (query) => {
    let accessToken = localStorage.getItem("access-token");
    let responce = await axios.post(`${API_URL}/search`, { query, accessToken });
    return responce.data;
}

export const getPlaylist = async (id) => {
    let data = JSON.parse(localStorage.getItem("user"));
    if (!id) {
        let responce = await axios.get(`${API_URL}/playlist`, { headers: {
            Authorization: `Bearer ${data.token}`
        }});
        return responce.data;
    } else {
        let responce = await axios.get(`${API_URL}/playlist/${id}`, { headers: {
            Authorization: `Bearer ${data.token}`
        }});
        return responce.data;
    }

}

export const createPlaylist = async (name) => {
    let data = JSON.parse(localStorage.getItem("user"))
    let responce = await axios.post(`${API_URL}/playlist`, {
        name
    }, {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    });
    return responce.data;
}

export const deletePlaylist = async (id) => {
    let data = JSON.parse(localStorage.getItem("user"))
    let responce = await axios.post(`${API_URL}/playlist/del`, {
        playlistId: id
    }, {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    });
    return responce.data;
}

export const addTrackToPlaylist = async (track, playlistId) => {
    let data = JSON.parse(localStorage.getItem("user"))
    let responce = await axios.post(`${API_URL}/playlist/${playlistId}/track`, {
        track
    }, {
        headers: {
            Authorization: `Bearer ${data.token}`
        }
    });
    return responce.data;
}