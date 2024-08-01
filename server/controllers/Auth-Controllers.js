const User = require('../models/userSchema')
const sendToken = require('../utils/jwtToken');
const crypto = require('crypto');
const sendEmail = require('../utils/mail');

const register = async (req, res,next) => {
    try {
        const { username, email, password, role } = req.body;
        // if (!username || !email || !password || !role) {
        //     return res.status(400).json({ message: "All fields are required" });
        // }

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create the user
        const userCreated = await User.create({ username, email, password, role });

        // Generate verification token
        const verificationToken = userCreated.generateVerificationToken();
        await userCreated.save();

        // Send verification email
        const verificationUrl = `${req.protocol}://${req.get('host')}/api/user/verify-email/${verificationToken}`;
        const message = `Please verify your email by clicking on the following link: \n\n ${verificationUrl}`;
        console.log(message);
        await sendEmail({ email: userCreated.email, subject: 'Email Verification', message });

        res.status(200).json({ message: 'Registration successful. Please check your email for verification link.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error While Registering User', error: error.message });
        next(error);
    }
};

const login = async (req, res,next) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if the user exists in the database
        const userExists = await User.findOne({ email: email }).select("+password");
        if (!userExists) {
            return res.status(400).json({ message: "No user found with this email" });
        }

        const isMatch = await userExists.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        if (userExists.role !== role) {
            return res.status(400).json({ message: "User role does not match" });
        }
        sendToken(userExists, 200, "User logged in successfully", res);


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while Logging In User', error: error.message });
        next(error);
    }
};

const logout = async (req, res) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json({
            success: true,
            message: "User logged out!",
        });
}

const verifyEmail = async (req, res) => {
    try {
        const verificationToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            verificationToken,
            verificationTokenExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;
        await user.save();

        // res.status(200).json({ message: 'Email verified successfully' });
        res.redirect('http://localhost:5173/verifyPage');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying email' });
    }
}
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        console.log("userId: ",user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = user.generateResetPasswordToken();
        await user.save();

        // Create reset URL
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
        console.log("Reset Password link : ", message);
        await sendEmail({ email: user.email, subject: 'Password reset token', message });

        res.status(200).json({ message: 'Email sent',userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email' });
    }
};
const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error resetting password' });
    }
};
module.exports = { register, login, logout,verifyEmail,forgotPassword,resetPassword};
