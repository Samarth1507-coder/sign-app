const Signature = require("../models/Signature");

// Add Signature
const addSignature = async (req, res) => {
  try {
    const { documentId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newSignature = new Signature({
      signaturePath: req.file.path,       // ✅ Corrected: signaturePath, not filePath
      document: documentId,               // ✅ Match the schema
      user: req.user,                     // ✅ Set from auth middleware
    });

    const saved = await newSignature.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while uploading signature' });
  }
};


// Update Signature Position
const updatePosition = async (req, res) => {
  const { x, y, pageNumber } = req.body;

  try {
    const signature = await Signature.findByIdAndUpdate(
      req.params.id,
      { x, y, pageNumber },
      { new: true }
    );

    if (!signature) {
      return res.status(404).json({ message: "Signature not found" });
    }

    res.json(signature);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while updating position" });
  }
};

// Get a single signature
const getSignature = async (req, res) => {
  try {
    const signature = await Signature.findById(req.params.id).populate("document").populate("user");
    if (!signature) {
      return res.status(404).json({ message: "Signature not found" });
    }
    res.json(signature);
  } catch (err) {
    res.status(500).json({ message: "Server error while retrieving signature" });
  }
};

//  Final Export
module.exports = {
  addSignature,
  updatePosition,
  getSignature,
};
