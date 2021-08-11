const express = require('express');
const router = express.Router();

const checkUser = require('../controllers/checkUser.js')

// Route

router.get('/', checkUser.requireAuth);

router.get("/logout", checkUser.logout);

module.exports = router;