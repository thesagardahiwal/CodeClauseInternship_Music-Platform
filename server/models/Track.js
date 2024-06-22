const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
    song: {type: Object}
});

const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;