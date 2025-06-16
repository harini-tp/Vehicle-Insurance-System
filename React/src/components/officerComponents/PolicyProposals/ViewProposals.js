import React, { useState, useEffect } from "react";
import { getBasePremiumPlans } from "../../../services/DisplayService";
import { viewPolicyProposals } from "../../../services/OfficerService";
import { useNavigate } from "react-router-dom";
import "./ViewProposals.css";

const ViewProposals = () => {
  const [basePremiums, setBasePremiums] = useState([]);
  const [selectedBasePremiumId, setSelectedBasePremiumId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [proposals, setProposals] = useState([]);
  const navigate = useNavigate();

  const statuses = [
    "Accepted",
    "Rejected",
    "Proposal Submitted",
    "Document Submitted",
    "Documents Required",
  ];

  useEffect(() => {
    const fetchBasePremiums = async () => {
      try {
        const data = await getBasePremiumPlans();
        setBasePremiums(data);
      } catch (error) {
        console.error("Error fetching base premiums:", error);
      }
    };

    fetchBasePremiums();
  }, []);

  useEffect(() => {
  handleSearch(); 
  }, []);

  const handleSearch = async () => {
    try {
      const statusQuery =
        selectedStatus === "Documents Required"
          ? "DocumentsRequired"
          : selectedStatus;

      const data = await viewPolicyProposals(
        selectedBasePremiumId || null,
        statusQuery || null
      );
      setProposals(data);
    } catch (error) {
      console.error("Error fetching proposals:", error);
      setProposals([]);
    }
  };

  return (
    <div className="view-proposals-container">
      <button className="back-button-proposals" onClick={() => navigate("/officer-home")}>
        Back to Home
      </button>

      <h2 className="title">View Policy Proposals</h2>

      <div className="filters">
        <div className="filter-group">
          <label>Filter by Base Premium:</label>
          <select
            value={selectedBasePremiumId}
            onChange={(e) => setSelectedBasePremiumId(e.target.value)}
          >
            <option value="">-- All --</option>
            {basePremiums.map((bp) => (
              <option key={bp.basePremiumId} value={bp.basePremiumId}>
                {bp.vehicleType} - {bp.coverageType} ({bp.coverageAmount})
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Filter by Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">-- All --</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <div className="proposals-section">
        {proposals.length === 0 ? (
          <p className="no-proposals">No proposals found.</p>
        ) : (
          proposals.map((p) => (
            <div key={p.proposalId} className="proposal-card">
              <p><strong>Status:</strong> {p.status}</p>
              <p><strong>Date:</strong> {new Date(p.proposalDate).toLocaleDateString()}</p>
              <p><strong>Vehicle:</strong> {p.vehicle?.make} {p.vehicle?.model} ({p.vehicle?.vehicleNumber})</p>
              <p><strong>Base Plan:</strong> {p.basePremiumPlan?.vehicleType} - {p.basePremiumPlan?.coverageType}</p>
            </div>
          ))
        )}
      </div>

      <div className="edit-status-footer">
        <p>To edit the status of submitted proposals:</p>
        <button onClick={() => navigate("/edit-proposal-status")}>
          Edit Proposal Status
        </button>
      </div>
    </div>
  );
};

export default ViewProposals;


