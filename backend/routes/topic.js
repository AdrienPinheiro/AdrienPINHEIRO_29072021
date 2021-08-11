const express = require('express');
const router = express.Router();

const topicCtrl = require('../controllers/topic');
const multer = require('..//middleware/multer-config');
const auth = require('../middleware/auth')

// Va chercher les demandes correspondantes suivant la demande: soit un log soit un sign
router.post('/', multer, topicCtrl.post);

router.get('/', multer, topicCtrl.getAll);

router.put('/id', auth, multer, topicCtrl.modify);

router.delete('/id', auth, multer, topicCtrl.delete);

module.exports = router;