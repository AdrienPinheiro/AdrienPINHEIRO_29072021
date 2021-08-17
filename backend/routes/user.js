const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('..//middleware/multer-config');
const auth = require('../middleware/auth');

// Routes

router.post('/signup', multer, userCtrl.signup);
router.post('/login', multer, userCtrl.login);

router.get('/users', userCtrl.getAll);

router.post('/id', userCtrl.getOne);


router.put('/option/', multer, userCtrl.modify);

router.delete('/option/', multer, userCtrl.delete);

module.exports = router;