import React, { useEffect, useState } from "react";
import { viewPolicies, viewPolicyProposals } from "../../../services/OfficerService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ViewPolicies.css";

const ViewPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [selectedProposalId, setSelectedProposalId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const fetchAllPolicies = async () => {
    try {
      const data = await viewPolicies();
      setPolicies(data);
    } catch (err) {
      toast.error("Failed to load policies.");
    }
  };

  const handleSearch = async () => {
    try {
      const data = await viewPolicies(selectedProposalId, statusFilter);
      setPolicies(data);
    } catch (err) {
      toast.error("No matching policies found.");
    }
  };

  useEffect(() => {
    fetchAllPolicies();
    const fetchProposals = async () => {
      try {
        const data = await viewPolicyProposals();
        setProposals(data);
      } catch {
        toast.error("Error loading proposals");
      }
    };
    fetchProposals();
  }, []);

  return (
    <div className="policies-container">
      <button className="back-button-vp" onClick={() => navigate("/officer-home")}>
        Back to Home
      </button>
      <h2 className="title">All Policies</h2>

      <div className="filter-bar">
        <div className="filter-group">
          <label>Filter by Proposal:</label>
          <select
            className="dropdown"
            value={selectedProposalId}
            onChange={(e) => setSelectedProposalId(e.target.value)}
          >
            <option value="">-- All Proposals --</option>
            {proposals.map((p) => (
              <option key={p.proposalId} value={p.proposalId}>
                Proposal {p.proposalId} - {p.vehicle?.vehicleNumber}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select
            className="dropdown"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">-- All Statuses --</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {policies.length === 0 ? (
        <p className="no-data">No policies found.</p>
      ) : (
        <div className="policies-grid">
          {policies.map((p) => (
            <div key={p.policyId} className="policy-card">
              <p><strong>Policy Number:</strong> {p.policyNumber}</p>
              <p><strong>Status:</strong> {p.status}</p>
              <p><strong>Activation:</strong> {new Date(p.activationDate).toLocaleDateString()}</p>
              <p><strong>Expiry:</strong> {new Date(p.expiryDate).toLocaleDateString()}</p>
              <p><strong>Vehicle:</strong> {p.vehicleNumber} ({p.make} {p.model})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPolicies;


