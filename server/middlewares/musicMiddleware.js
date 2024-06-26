
const checkToken = (req, res, next) => {
    try {
        const {accessToken, moodParams} = req.body;
        
        if (!accessToken || !moodParams) {
            return res.status(400).json({error: "Error fetching recommendations"})
        }
        next();
        
    }catch (e) {
        console.log(e)
    }
}

const searchToken = (req, res, next) => {
    next();
}

module.exports = { checkToken, searchToken }