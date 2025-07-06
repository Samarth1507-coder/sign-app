const Document = require("../models/Document");

const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(documents);
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ message: "Server error while fetching documents" });
  }
};

 const uploadPDF = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const newDoc = new Document({
      userId: req.user, // From authMiddleware
      originalName: req.file.originalname,
      filePath: req.file.path
    });

    await newDoc.save();
    res.status(201).json({ message: 'PDF uploaded successfully', document: newDoc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
getAllDocuments,
uploadPDF
};
