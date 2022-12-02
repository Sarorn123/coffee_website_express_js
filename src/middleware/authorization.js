module.exports = function checkPermission(roles){
    return (req, res, next) => {
        const role = req.user.role;
        if(roles.includes(role)) next();
        else return res.status(400).json({message: "Not Accept"})
    }
}