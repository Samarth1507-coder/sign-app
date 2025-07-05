import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { useParams } from "react-router-dom";
import Draggable from "react-draggable";
import "./PDFViewer.css";

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
      setPdfUrl(res.data.fileUrl);
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

  const handleStop = async (e, data, sig) => {
    try {
      await axios.put(
        `http://localhost:5000/api/signature/position/${sig._id}`,
        {
          x: data.x,
          y: data.y,
          pageNumber: sig.pageNumber,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Position updated!");
    } catch (err) {
      console.error("Error updating position", err);
    }
  };

  return (
    <div className="pdfviewer-container">
      <h2>PDF Viewer with Draggable Signatures</h2>
      {pdfUrl && (
        <Document file={pdfUrl} onLoadSuccess={handleDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_, index) => (
            <div className="pdf-page" key={index}>
              <Page pageNumber={index + 1} width={600} />
              {signatures
                .filter((sig) => sig.pageNumber === index + 1)
                .map((sig, idx) => (
                  <Draggable
                    key={idx}
                    defaultPosition={{ x: sig.x, y: sig.y }}
                    onStop={(e, data) => handleStop(e, data, sig)}
                  >
                    <img
                      src={`/${sig.filePath}`}
                      className="signature-overlay"
                      alt="Signature"
                    />
                  </Draggable>
                ))}
            </div>
          ))}
        </Document>
      )}
    </div>
  );
};

export default PDFViewer;
