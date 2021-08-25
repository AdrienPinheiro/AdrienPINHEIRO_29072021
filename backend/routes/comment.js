const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

// Va chercher les demandes correspondantes suivant la demande: soit un log soit un sign

router.post('/:id', auth, commentCtrl.post);

router.get('/:topicId', commentCtrl.getAll);

router.put('/:commentId', auth, commentCtrl.modify);

router.delete('/:commentId', auth, commentCtrl.delete);

module.exports = router;