// src/pages/PDFViewer.jsx
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PDFViewer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = () => {
  const { id } = useParams(); // documentId
  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [signatures, setSignatures] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPDF = async () => {
      const res = await axios.get(`http://localhost:5000/api/docs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPdfUrl(res.data.fileUrl); // make sure your backend sends fileUrl
    };

    const fetchSignatures = async () => {
      const res = await axios.get(`http://localhost:5000/api/signature/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSignatures(res.data);
    };

    fetchPDF();
    fetchSignatures();
  }, [id]);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdfviewer-container">
      <h2>PDF Viewer</h2>
      {pdfUrl && (
        <Document file={pdfUrl} onLoadSuccess={handleDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_, index) => (
            <div className="pdf-page" key={index}>
              <Page pageNumber={index + 1} width={600} />
              {signatures
                .filter((sig) => sig.pageNumber === index + 1)
                .map((sig, idx) => (
                  <img
                    key={idx}
                    src={`/${sig.filePath}`}
                    className="signature-overlay"
                    style={{
                      left: `${sig.x}px`,
                      top: `${sig.y}px`,
                    }}
                    alt="Signature"
                  />
                ))}
            </div>
          ))}
        </Document>
      )}
    </div>
  );
};

export default PDFViewer;
