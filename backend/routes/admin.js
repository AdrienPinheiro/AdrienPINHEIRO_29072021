const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');
const admin = require('../middleware/admin');

// Route

router.get('/users', admin, adminCtrl.getAllUser);

router.get('/users/id', admin, adminCtrl.getOneUser);

router.delete('/users/id', admin, adminCtrl.deleteOneUser);

module.exports = router;