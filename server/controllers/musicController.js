// controllers/musicController.js
const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://api.deezer.com/track/3125556',
  };

const getTracks = async (req, res) => {
    try {
        const response = await axios(options) // Replace with actual API URL
        res.json(response.data);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching tracks', error });
    }
};

const fetchAccessToken = async (req, res) => {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                grant_type: 'client_credentials',
            },
            headers: {
                'Authorization': 'Basic ' + btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`),
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        res.json(response.data.access_token);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching tracks', error });
    }
};

const fetchRecommendations = async (req, res) => {
    const { accessToken, moodParams } = req.body;
    try {
        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                limit: 10,
                seed_genres: moodParams.genres.join(','),  // Example: ['happy', 'chill']
                target_danceability: moodParams.danceability,
                target_energy: moodParams.energy,
                target_valence: moodParams.valence
            }
        });
        res.status(200).json(response.data.tracks);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
};


module.exports = { getTracks, fetchAccessToken, fetchRecommendations };
