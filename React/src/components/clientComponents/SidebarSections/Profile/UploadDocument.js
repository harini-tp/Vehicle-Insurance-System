import React, { useState, useEffect, useContext } from "react";
import { uploadDocument, getProposalStatus } from "../../../../services/ClientService";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UploadDocument.css";

const UploadDocument = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [proposals, setProposals] = useState([]);
  const [allProposals, setAllProposals] = useState([]);
  const [selectedProposalId, setSelectedProposalId] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const data = await getProposalStatus(userId);
        setAllProposals(data);
        const filtered = data.filter((p) => p.status === "DocumentsRequired");
        setProposals(filtered);
      } catch (error) {
        toast.error("You have no policy proposal.");
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, [userId]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedProposalId || !file) {
      toast.warn("Please select a proposal and choose a file.");
      return;
    }

    try {
      await uploadDocument(selectedProposalId, file);
      toast.success("Document uploaded successfully.");
      setSelectedProposalId("");
      setFile(null);
    } catch (error) {
      toast.error("Failed to upload document.");
    }
  };

  const renderContent = () => {
    if (loading) return <p className="info-text">Loading proposals...</p>;

    if (allProposals.length === 0) {
      return (
        <div className="message-container">
          <p>You have not created any policy proposals yet.</p>
          <button onClick={() => navigate("/propose-policy")}>Propose Policy</button>
        </div>
      );
    }

    if (proposals.length === 0) {
      return (
        <div className="message-container">
          <p>You have no policy proposals that require document upload.</p>
        </div>
      );
    }

    return (
      <>
        <p className="subtext">Click a proposal card to select, then upload your file.</p>

        <div className="proposal-list">
          {proposals.map((proposal) => (
            <div
              key={proposal.proposalId}
              className={`proposal-card ${selectedProposalId === proposal.proposalId ? "selected" : ""}`}
              onClick={() => setSelectedProposalId(proposal.proposalId)}
            >
              <p><strong>Vehicle:</strong> {proposal.vehicle?.vehicleNumber}</p>
              <p><strong>Premium:</strong> ₹{proposal.basePremiumPlan?.basePremiumAmount}</p>
              <p><strong>Date:</strong> {new Date(proposal.proposalDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleUpload} className="upload-form">
          <label>Select File:</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.txt"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">Upload</button>
        </form>
      </>
    );
  };

  return (
    <div className="upload-container">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <h2>Upload Supporting Documents</h2>
      {renderContent()}
    </div>
  );
};

export default UploadDocument;



