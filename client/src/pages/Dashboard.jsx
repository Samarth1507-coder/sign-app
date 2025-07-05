import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token'); // assume login stores token
      const res = await axios.get('http://localhost:5000/api/docs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(res.data);
    } catch (err) {
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📄 Uploaded PDFs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc._id} style={{ marginBottom: '1rem' }}>
              <strong>{doc.originalName}</strong><br />
              <small>Uploaded: {new Date(doc.uploadedAt).toLocaleString()}</small><br />
              <em>Path:</em> {doc.filePath}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
