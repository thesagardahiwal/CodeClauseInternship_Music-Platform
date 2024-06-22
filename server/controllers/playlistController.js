

const createPlaylist = (req, res) => {
    console.log("Fired");
    res.status(200).json('Data')
}

const getPlaylist = (req, res) => {}

const addSongToPlaylist = (req, res) => {}

module.exports  = {
    createPlaylist,
    getPlaylist,
    addSongToPlaylist
}