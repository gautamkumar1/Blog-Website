const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')

//AUTHENTICATION
const isAuthenticated = async (req, res, next) => {
    console.log("Cookies:", req.cookies); // Debugging line
    
    // First, check the token in the cookies
    let token = req.cookies.token;

    // If the token is not in the cookies, check the Authorization header
    if (!token && req.headers["authorization"]) {
        const authHeader = req.headers["authorization"];
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(" ")[1];
        }
    }

    console.log("Authentication token:", token); // Debugging line

    if (!token) {
        return res.status(401).send("User is not authenticated!");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).send("Invalid token!");
    }
};


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

