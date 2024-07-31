const express = require('express');
const { register, login, logout, getMyProfile, verifyEmail, forgotPassword, resetPassword } = require('../controllers/Auth-Controllers');
const { isAuthenticated, isAuthorized } = require('../middlewares/AuthMiddleware');
const { createBlog, showDraftBlogs, checkBlogIsApprovedOrNot } = require('../controllers/Blog-Controllers');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated,logout);
router.get('/verify-email/:token',verifyEmail)
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.post('/create-blog',isAuthenticated,isAuthorized('Writer'),createBlog)
router.get('/draft-blog',isAuthenticated,isAuthorized('Writer'),showDraftBlogs)
router.get('/blog',isAuthenticated,isAuthorized('Writer'),checkBlogIsApprovedOrNot)

module.exports = router;