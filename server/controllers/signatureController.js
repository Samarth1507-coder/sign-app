const Signature = require('../models/Signature');

exports.addSignature = async (req, res) => {
  try {
    const { documentId, coordinates, page } = req.body;

    const newSignature = new Signature({
      documentId,
      userId: req.user,
      coordinates,
      page,
    });

    await newSignature.save();
    res.status(201).json({ message: 'Signature saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving signature', error });
  }
};

exports.getSignatures = async (req, res) => {
  try {
    const { documentId } = req.params;
    const signatures = await Signature.find({ documentId });
    res.status(200).json(signatures);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching signatures', error });
  }
};
