import React, { useState, useEffect, useContext } from "react";
import { getProposalStatus, downloadPolicyQuoteSummary } from "../../../../services/ClientService";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DownloadSummary.css";

const DownloadSummary = () => {
  const { userId } = useContext(AuthContext);
  const [proposals, setProposals] = useState([]);
  const [selectedProposalId, setSelectedProposalId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const data = await getProposalStatus(userId);
        setProposals(data);
      } catch (error) {
        toast.error("Error fetching proposals.");
      }
    };
    fetchProposals();
  }, [userId]);

  const handleDownload = async () => {
    if (!selectedProposalId) {
      toast.warn("Please select a proposal to download.");
      return;
    }

    try {
      const response = await downloadPolicyQuoteSummary(selectedProposalId);
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `PolicySummary_Proposal_${selectedProposalId}.txt`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Download started.");
    } catch (error) {
      toast.error("Failed to download summary.");
    }
  };

  return (
    <div className="download-container">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <h2>Download Quote Summary</h2>

      {proposals.length === 0 ? (
        <div className="no-proposals">
          <p>You have no proposals available for summary download.</p>
          <button onClick={() => navigate("/propose-policy")}>Propose a Policy</button>
        </div>
      ) : (
        <>
          <p className="subtext">Click a card to select a proposal</p>
          <div className="proposal-list">
            {proposals.map((proposal) => (
              <div
                key={proposal.proposalId}
                className={`proposal-card ${selectedProposalId === proposal.proposalId ? "selected" : ""}`}
                onClick={() => setSelectedProposalId(proposal.proposalId)}
              >
                <p><strong>Proposal #</strong> {proposal.proposalNumber || proposal.proposalId}</p>
                <p><strong>Vehicle:</strong> {proposal.vehicle?.vehicleNumber}</p>
                <p><strong>Date:</strong> {new Date(proposal.proposalDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          <button className="download-btn" onClick={handleDownload}>Download Summary</button>
        </>
      )}
    </div>
  );
};

export default DownloadSummary;

