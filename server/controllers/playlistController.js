const User = require('../models/User');
const Playlist  = require("../models/Playlist");
const Track = require("../models/Track");

const createPlaylist = async (req, res) => {
    const { name } = req.body;
    const user_id = req.user.id;
    if (name.length < 1) {
        res.status(401).json({message:"Invalid Name"});
    }
    const playlist = new Playlist({name: name, date: new Date().toLocaleDateString()});
    playlist.save();
    const user = await User.findByIdAndUpdate(user_id, {$push: { playlist: playlist._id }});
    user.save();

    res.status(200).json({message: "Successful"})
}

const getPlaylists = async (req, res) => {
    const user_id = req.user.id;
    const user = await User.findById(user_id).populate('playlist');
    const playlist = (await Playlist.find({_id: { $in: user.playlist}}));
    res.json(playlist);
}

const addSongToPlaylist = async (req, res) => {
    const { track } = req.body;
    const { id } = req.params;
    const song = new Track({...track})
    song.save();
    await Playlist.findByIdAndUpdate(id, {$push: { tracks: song._id }});
    res.status(200).json("added Successfully")
}

const deletePlaylist = async (req, res) => {
    const user_id = req.user.id;
    const {playlistId} = req.body;
    await User.findByIdAndUpdate(user_id, {$pull: {playlist: playlistId}});
    await Playlist.findByIdAndDelete(playlistId);
    res.status(200).json("Deletion Successfull!")
}

const getPlaylist = async (req, res) => {
    const playlistId = req.params.id
    try {
        const playlist = await Playlist.findById(playlistId).populate('tracks');
        res.status(200).json(playlist)  
    } catch (e) {
        res.status(400).json("playlist is not opened")
    }
}

module.exports  = {
    createPlaylist,
    getPlaylists,
    addSongToPlaylist,
    deletePlaylist,
    getPlaylist
}