import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import "./SignaturePlacement.css";

const SignaturePlacement = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [signatureUrl, setSignatureUrl] = useState("");
  const [docId, setDocId] = useState("");
  const [signatureId, setSignatureId] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Fetch document + signature preview
    setPdfUrl("/uploads/sample.pdf"); // Replace with actual doc path
    setSignatureUrl("/uploads/signature.png"); // Replace with uploaded signature path
  }, []);

  const handleDragStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:5000/api/signature/position/${signatureId}`, {
        x: position.x,
        y: position.y,
        pageNumber: 1, // Assuming single-page for now
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Signature position saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save position.");
    }
  };

  return (
    <div className="placement-container">
      <h2>Place Signature on PDF</h2>

      <input
        type="text"
        placeholder="Enter Document ID"
        value={docId}
        onChange={(e) => setDocId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Signature ID"
        value={signatureId}
        onChange={(e) => setSignatureId(e.target.value)}
      />
      <div className="pdf-preview">
        <img src={pdfUrl} alt="PDF Preview" className="pdf-image" />
        <Draggable onStop={handleDragStop}>
          <img src={signatureUrl} alt="Signature" className="signature-image" />
        </Draggable>
      </div>

      <button onClick={handleSave}>Save Position</button>
    </div>
  );
};

export default SignaturePlacement;
