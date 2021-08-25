const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const multer = require('..//middleware/multer-config');
const auth = require('../middleware/auth');

// Routes

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/id', auth, userCtrl.getOne);

router.get('/users', userCtrl.getAll);

router.put('/option/:id', auth, userCtrl.modify);

router.delete('/option/:id', auth, userCtrl.delete);

module.exports = router;