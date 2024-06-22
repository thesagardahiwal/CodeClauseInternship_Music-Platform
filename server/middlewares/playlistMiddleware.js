
const checkTokenForPlaylist = (req, res, next) => {
    console.log(req.headers);
    next();
};

module.exports = { checkTokenForPlaylist }