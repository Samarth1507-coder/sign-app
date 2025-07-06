import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css"; // Create this for styling

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/docs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocuments(res.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Your Uploaded Documents</h2>
      <div className="documents-grid">
        {documents.map((doc) => (
          <div key={doc._id} className="document-card">
            <p><strong>{doc.originalName}</strong></p>
            <a href={`http://localhost:5000/${doc.filePath}`} target="_blank" rel="noreferrer">📄 View PDF</a>
            {/* Optional: buttons to go to signature placement */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
