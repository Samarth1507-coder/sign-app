const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/authMiddleware');

const {
  addSignature,
  getSignature,
  updatePosition
} = require('../controllers/signatureController');

router.post('/', auth, upload.single("signature"), addSignature);
router.get('/document/:documentId', auth, getSignature);
router.get('/:id', auth, getSignature);
router.put('/position/:id', auth, updatePosition);

module.exports = router;
