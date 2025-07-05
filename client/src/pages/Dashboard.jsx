// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleUploadNavigate = () => {
    navigate("/upload");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to DocuSign Clone</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="dashboard-actions">
        <button onClick={handleUploadNavigate}>📄 Upload New Document</button>
      </div>

      <div className="document-list-placeholder">
        <h3>Your Documents</h3>
        <p>(List will be shown here after we complete listing logic)</p>
      </div>
    </div>
  );
};

export default Dashboard;
