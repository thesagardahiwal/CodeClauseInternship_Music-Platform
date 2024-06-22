const express = require('express');
const router = express.Router();
const { getPlaylist, addSongToPlaylist, createPlaylist } = require("../controllers/playlistController.js");
const { checkTokenForPlaylist } = require("../middlewares/playlistMiddleware.js")
const { protect } = require("../middlewares/authMiddleware.js")

router
.get("/", protect, getPlaylist)
.post("/", protect, createPlaylist)
.post("/:id/song", protect, addSongToPlaylist);

module.exports = router;