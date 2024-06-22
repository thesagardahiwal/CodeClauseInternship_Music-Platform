const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    name: String,
    tracks: [{type: mongoose.Schema.ObjectId, ref: "Track"}],
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = Playlist;