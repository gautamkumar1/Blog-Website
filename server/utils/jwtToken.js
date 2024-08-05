const sendToken = (user, statusCode, message, res) => {
    const token = user.generateJWTToken();
    
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // valid for 24 hr
        ),
        httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token,
    });
};

module.exports = sendToken;