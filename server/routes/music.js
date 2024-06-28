// routes/music.js
const express = require('express');
const { getTracks, fetchAccessToken, fetchRecommendations, searchTracks } = require('../controllers/musicController.js');
const { protect } = require('../middlewares/authMiddleware.js');
const { checkToken, searchToken } = require('../middlewares/musicMiddleware.js');
const router = express.Router();

router
    .get('/tracks', getTracks)
    .get('/free-tracks', getTracks)
    .get('/token', fetchAccessToken)
    .post('/recommendations', checkToken, fetchRecommendations)
    .post('/search', searchToken, searchTracks);

module.exports = router;
