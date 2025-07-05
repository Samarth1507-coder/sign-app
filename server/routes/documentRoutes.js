const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/authMiddleware');
const { uploadPDF } = require('../controllers/documentController');
//const { getUserDocuments } = require('../controllers/documentController');

// Route: POST /api/docs/upload
router.post('/upload', auth, upload.single('file'), uploadPDF);
//router.get('/', auth, getUserDocuments);

module.exports = router;
