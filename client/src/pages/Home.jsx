import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1>📄 Document Signature App</h1>
      <div className="nav-buttons">
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/upload")}>Upload Document</button>
        <button onClick={() => navigate("/upload-signature")}>Upload Signature</button>
        <button onClick={() => navigate("/view-signatures")}>View Signatures</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
