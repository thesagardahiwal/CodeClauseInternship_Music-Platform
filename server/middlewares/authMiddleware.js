// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next()
    } catch (e) {
        console.log("Error to fetch !")
    }
    
};

module.exports = { protect };
