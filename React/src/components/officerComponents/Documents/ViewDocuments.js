import React, { useEffect, useState } from "react";
import { viewDocuments } from "../../../services/OfficerService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ViewDocuments.css";

const ViewDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await viewDocuments();
        setDocuments(data);
      } catch (error) {
        toast.error("Failed to load documents.");
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="view-doc-container">
      <button
        onClick={() => navigate("/officer-home")}
        className="back-btn-vd"
      >
        Back to Home
      </button>

      <h2 className="vd-title">Uploaded Documents</h2>

      {documents.length === 0 ? (
        <p className="vd-empty-msg">No documents found.</p>
      ) : (
        <div className="vd-card-grid">
          {documents.map((doc) => (
            <div key={doc.documentId} className="vd-card">
              <p><strong>Document ID:</strong> {doc.documentId}</p>
              <p><strong>File Name:</strong> {doc.fileName}</p>
              <p><strong>File Type:</strong> {doc.fileType}</p>
              <p><strong>Uploaded Date:</strong> {new Date(doc.uploadedDate).toLocaleDateString()}</p>
              <p><strong>File Path:</strong> {doc.filePath}</p>

              {doc.proposal && (
                <>
                  <hr className="vd-divider" />
                  <p><strong>Proposal ID:</strong> {doc.proposal.proposalId}</p>
                  <p><strong>Status:</strong> {doc.proposal.status}</p>
                  <p><strong>Vehicle ID:</strong> {doc.proposal.vehicleId}</p>
                  <p><strong>Base Premium ID:</strong> {doc.proposal.basePremiumId}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="vd-download-section">
        <p className="vd-download-text">To download documents, click below:</p>
        <button
          className="vd-download-btn"
          onClick={() => navigate("/get-document")}
        >
          Go to Download Page
        </button>
      </div>
    </div>
  );
};

export default ViewDocuments;


