const jwt = require("jsonwebtoken");

module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.splite(' ')[1];
    if(!token) return res.status(401).json({ message: "Unauthentication" });
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.status(401).json({ message: "Unauthentication" });
        req.user = user.data;
        next();
    });
}