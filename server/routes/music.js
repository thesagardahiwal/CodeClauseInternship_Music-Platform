// routes/music.js
const express = require('express');
const { getTracks, fetchAccessToken, fetchRecommendations } = require('../controllers/musicController.js');
const { protect } = require('../middlewares/authMiddleware.js');
const { checkToken } = require('../middlewares/musicMiddleware.js');
const router = express.Router();

router
    .get('/tracks', protect, getTracks)
    .get('/free-tracks', getTracks)
    .get('/token', fetchAccessToken)
    .post('/recommendations',checkToken, fetchRecommendations)

module.exports = router;
