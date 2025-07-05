import React, { useState } from "react";
import axios from "axios";
import "./ViewSignatures.css";

const ViewSignatures = () => {
  const [docId, setDocId] = useState("");
  const [signatures, setSignatures] = useState([]);

  const handleFetch = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:5000/api/signature/${docId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSignatures(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch signatures");
    }
  };

  return (
    <div className="view-signatures-container">
      <h2>View Signatures for Document</h2>
      <input
        type="text"
        placeholder="Enter Document ID"
        value={docId}
        onChange={(e) => setDocId(e.target.value)}
      />
      <button onClick={handleFetch}>Fetch Signatures</button>

      <div className="signatures-list">
        {signatures.length === 0 && <p>No signatures found.</p>}
        {signatures.map((sig) => (
          <div key={sig._id} className="signature-card">
            <p><strong>Uploaded by:</strong> {sig.uploadedBy}</p>
            <p><strong>File:</strong> <a href={`http://localhost:5000/${sig.filePath}`} target="_blank" rel="noreferrer">View</a></p>
            <p><strong>Position:</strong> X: {sig.x}, Y: {sig.y}, Page: {sig.pageNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSignatures;
