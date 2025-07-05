// src/pages/DocumentList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DocumentList.css";
import { useNavigate } from "react-router-dom";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/docs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocuments(res.data);
      } catch (err) {
        console.error("Error fetching documents", err);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="doclist-container">
      <h2>Uploaded Documents</h2>
      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Filename</th>
              <th>Uploaded By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.originalName}</td>
                <td>{doc.uploadedBy}</td>
                <td>{new Date(doc.uploadedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => navigate("/dashboard")}>← Back to Dashboard</button>
    </div>
  );
};

export default DocumentList;
