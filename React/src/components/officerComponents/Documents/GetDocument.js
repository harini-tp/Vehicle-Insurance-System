import React, { useEffect, useState } from "react";
import { viewDocuments, getDocument } from "../../../services/OfficerService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./GetDocument.css";

const DownloadDocument = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await viewDocuments();
        setDocuments(data);
      } catch (err) {
        toast.error("Failed to load documents.");
      }
    };
    fetchDocuments();
  }, []);

  const handleDownload = async (docId, fileName) => {
    try {
      const response = await getDocument(docId);

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "downloaded_file");
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("File downloaded successfully.");
    } catch (err) {
      toast.error("Failed to download file.");
    }
  };

  return (
    <div className="download-doc-container">
      <button
        onClick={() => navigate("/officer-home")}
        className="back-btn-dd"
      >
        Back to Home
      </button>

      <h2 className="dd-title">Download Documents</h2>

      {documents.length === 0 ? (
        <p className="dd-empty-msg">No documents found.</p>
      ) : (
        <div className="dd-card-grid">
          {documents.map((doc) => (
            <div key={doc.documentId} className="dd-card">
              <p><strong>Document ID:</strong> {doc.documentId}</p>
              <p><strong>File Name:</strong> {doc.fileName}</p>
              <p><strong>File Type:</strong> {doc.fileType}</p>
              <p><strong>Uploaded Date:</strong> {new Date(doc.uploadedDate).toLocaleDateString()}</p>

              <button
                onClick={() => handleDownload(doc.documentId, doc.fileName)}
                className="dd-download-btn"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadDocument;


