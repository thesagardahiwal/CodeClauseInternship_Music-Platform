const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
    name: String,
    album: {
        image: String
    },
    preview_url: String,

});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;