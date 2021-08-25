const express = require('express');
const router = express.Router();

const topicCtrl = require('../controllers/topic');
const multer = require('..//middleware/multer-config');
const auth = require('../middleware/auth')

// Va chercher les demandes correspondantes suivant la demande: soit un log soit un sign
router.post('/', auth, multer, topicCtrl.post);
router.post('/likeOrUnlike/:id', auth, topicCtrl.likeOrUnlike);

router.get('/', multer, topicCtrl.getAll);

router.put('/:topicId', auth, multer, topicCtrl.modify);

router.delete('/:topicId', auth, multer, topicCtrl.delete);

module.exports = router;