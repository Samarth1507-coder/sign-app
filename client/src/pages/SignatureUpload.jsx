// src/pages/SignatureUpload.jsx
import React, { useState } from "react";
import axios from "axios";
import "./SignatureUpload.css";
import { useNavigate } from "react-router-dom";

const SignatureUpload = () => {
  const [signatureFile, setSignatureFile] = useState(null);
  const [docId, setDocId] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSignatureFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!signatureFile || !docId) return alert("Select file and enter document ID");

    const formData = new FormData();
    formData.append("signature", signatureFile);
    formData.append("documentId", docId);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:5000/api/signature", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Signature uploaded successfully!");
      console.log(response.data);
      navigate("/dashboard");
    } catch (err) {
      alert("Signature upload failed");
      console.error(err);
    }
  };

  return (
    <div className="signature-container">
      <h2>Upload Signature</h2>
      <input
        type="text"
        placeholder="Enter Document ID"
        value={docId}
        onChange={(e) => setDocId(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Signature</button>
      <button onClick={() => navigate("/dashboard")} className="back-btn">← Back to Dashboard</button>
    </div>
  );
};

export default SignatureUpload;
