const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

// Va chercher les demandes correspondantes suivant la demande: soit un log soit un sign

router.post('/', commentCtrl.post);

router.get('/', commentCtrl.getAll);

router.put('/id', auth, commentCtrl.modify);

router.delete('/id', auth, commentCtrl.delete);

module.exports = router;