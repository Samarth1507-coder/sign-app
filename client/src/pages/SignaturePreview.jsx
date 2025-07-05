import React, { useState } from "react";
import "./SignaturePreview.css";

const SignaturePreview = () => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  const handleConfirm = () => {
    alert("Signature confirmed! Now go to 'Upload Signature' to use it.");
    // Here, you'd typically pass the signature to the upload form or backend
  };

  return (
    <div className="preview-container">
      <h2>Signature Preview</h2>
      <input type="file" accept="image/*" onChange={handleChange} />
      <br /><br />
      {previewURL && (
        <div className="preview-area">
          <img src={previewURL} alt="Signature Preview" />
          <br />
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default SignaturePreview;
