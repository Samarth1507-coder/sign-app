const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/Uploads');
const { uploadPDF } = require('../controllers/documentController');

// Route: POST /api/docs/upload
router.post('/upload', auth, upload.single('file'), uploadPDF);

module.exports = router;
