const express = require('express');
const { googleOAuth, getGoogleLoginCallback } = require('../controllers/OAuth-Controller');
const router = express.Router();
router.get('/google', googleOAuth);
router.get('/google/callback', getGoogleLoginCallback);
module.exports = router;