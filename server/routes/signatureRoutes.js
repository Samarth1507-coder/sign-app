const express = require('express');
const router = express.Router();
const { addSignature, getSignatures } = require('../controllers/signatureController');
const auth = require('../middleware/authMiddleware');

router.post('/add', auth, addSignature);
router.get('/:documentId', auth, getSignatures);

module.exports = router;
