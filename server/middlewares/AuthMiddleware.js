const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')

//AUTHENTICATION
const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).send("User is not authenticated!")
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
}


//AUTHORIZATION


const isAuthorized = (...roles) => {
    return (req, res, next) => {
        // console.log(`Checking roles: ${roles}`);
        // console.log(`User role: ${req.user.role}`);
        if (!roles.includes(req.user.role)) {
            return res.status(403).send(`User with this role (${req.user.role}) not allowed to access this resource`);
        }
        next();
    };
};

module.exports = { isAuthenticated, isAuthorized };

