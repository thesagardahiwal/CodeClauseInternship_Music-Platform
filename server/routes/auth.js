// routes/auth.js
const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/authController');
const { protect } = require("../middlewares/authMiddleware")
const router = express.Router();

router.get("/user", protect, getCurrentUser)
router.post('/register', register);
router.post('/login', login);


module.exports = router;
