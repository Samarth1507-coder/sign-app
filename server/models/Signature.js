const mongoose = require("mongoose");

const signatureSchema = new mongoose.Schema({
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  signaturePath: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    default: 0, // Default if not placed yet
  },
  y: {
    type: Number,
    default: 0,
  },
  pageNumber: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Signature", signatureSchema);
