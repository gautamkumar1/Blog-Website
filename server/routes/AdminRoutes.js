const express = require('express');
const AdminControllers = require('../controllers/Admin-Controllers');
const { isAuthenticated, isAuthorized } = require('../middlewares/AuthMiddleware');
const router = express.Router();
router.get('/allusers',isAuthenticated,isAuthorized("Admin"),AdminControllers.getAllUsers)
router.put('/posts/:id/status', isAuthenticated, isAuthorized('Admin'),AdminControllers.approvedPost)
router.get('/show-users', isAuthenticated, isAuthorized('Admin'),AdminControllers.showAllUser)
router.delete('/delete-user/:id', isAuthenticated, isAuthorized('Admin'),AdminControllers.deleteUser)
router.get('/show-allposts', isAuthenticated, isAuthorized('Admin'),AdminControllers.showAllPosts)
router.get('/approved-posts',AdminControllers.showApprovedPosts)
router.delete('/delete-posts/:id', isAuthenticated, isAuthorized('Admin'),AdminControllers.deletePost)
module.exports = router