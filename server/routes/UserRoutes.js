const express = require('express');
const { register, login, logout, getMyProfile, verifyEmail, forgotPassword, resetPassword } = require('../controllers/Auth-Controllers');
const { isAuthenticated, isAuthorized } = require('../middlewares/AuthMiddleware');
const { createBlog, showDraftBlogs, checkBlogIsApprovedOrNot, saveDraftBlog, getDraftBlogForUser, editDraft} = require('../controllers/Blog-Controllers');
const {signupSchema,loginSchema} = require('../validators/auth-validator')
const validate = require('../middlewares/validate-middleware')
const router = express.Router();

router.post("/register", validate(signupSchema),register);
router.post("/login", validate(loginSchema),login);
router.get("/logout", isAuthenticated,logout);
router.get('/verify-email/:token',verifyEmail)
router.post('/forgot-password', forgotPassword);
router.put('/reset_password/:token', resetPassword);
router.post('/create-blog',isAuthenticated,isAuthorized('Writer'),createBlog)
router.get('/draft-blog',isAuthenticated,isAuthorized('Writer'),showDraftBlogs)
router.get('/blog',isAuthenticated,isAuthorized('Writer'),checkBlogIsApprovedOrNot)
router.post('/save-draft',isAuthenticated,isAuthorized('Writer'),saveDraftBlog)
router.get('/get-drafts/:userId',isAuthenticated,isAuthorized('Writer'),getDraftBlogForUser)
router.put('/edit-drafts/:id',isAuthenticated,isAuthorized('Writer'),editDraft)

module.exports = router;