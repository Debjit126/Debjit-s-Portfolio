// server/routes/profile.js
const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
router.get('/', getProfile);
router.put('/', updateProfile);
module.exports = router;
