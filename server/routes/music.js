// routes/music.js
const express = require('express');
const { getTracks, fetchAccessToken, fetchRecommendations, searchTracks } = require('../controllers/musicController.js');
const { protect } = require('../middlewares/authMiddleware.js');
const { checkToken, searchToken } = require('../middlewares/musicMiddleware.js');
const router = express.Router();

router
    .get('/tracks', protect, getTracks)
    .get('/free-tracks', getTracks)
    .get('/token', protect, fetchAccessToken)
    .post('/recommendations', protect, checkToken, fetchRecommendations)
    .post('/search', protect, searchToken, searchTracks);

module.exports = router;
