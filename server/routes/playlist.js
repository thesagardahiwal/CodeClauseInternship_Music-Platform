const express = require('express');
const router = express.Router();
const { getPlaylists, addSongToPlaylist, getPlaylist, createPlaylist, deletePlaylist } = require("../controllers/playlistController.js");
const { checkTokenForPlaylist } = require("../middlewares/playlistMiddleware.js")
const { protect } = require("../middlewares/authMiddleware.js")

router
.get("/", protect, getPlaylists)
.get("/:id", protect, getPlaylist)
.post("/", protect,  createPlaylist)
.post("/:id/track", protect, addSongToPlaylist)
.post("/del", protect, deletePlaylist)

module.exports = router;