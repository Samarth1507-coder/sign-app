const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/authMiddleware');
const {
  uploadPDF,
  getAllDocuments,
} = require('../controllers/documentController');

// POST /api/docs/upload - Upload a new PDF
router.post('/upload', auth, upload.single('file'), uploadPDF);

// GET /api/docs - Get all documents uploaded by the authenticated user
router.get("/", auth, getAllDocuments);

module.exports = router;