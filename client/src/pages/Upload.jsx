// src/pages/UploadDocument.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

const UploadDocument = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF to upload");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:5000/api/docs/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully!");
      console.log(response.data);
      navigate("/dashboard");
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a PDF Document</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={() => navigate("/dashboard")} className="back-btn">
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default UploadDocument;
