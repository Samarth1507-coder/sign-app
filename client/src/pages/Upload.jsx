import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token'); // assuming you're saving JWT here

      const response = await axios.post('http://localhost:5000/api/docs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      setMessage('File uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'File upload failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Upload PDF</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit" style={{ marginLeft: '10px' }}>Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;
