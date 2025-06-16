import React, { useEffect, useState } from "react";
import { viewPolicyProposals, editProposalStatus } from "../../../services/OfficerService";
import { getAddOnPlans } from "../../../services/DisplayService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./EditProposalStatus.css"; 

const EditProposalStatus = () => {
  const [proposals, setProposals] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProposals();
    fetchAddOns();
  }, []);

  const fetchProposals = async () => {
    try {
      const data = await viewPolicyProposals(null, null, null);
      setProposals(data);
    } catch (error) {
      toast.error("Error fetching proposals");
    }
  };

  const fetchAddOns = async () => {
    try {
      const data = await getAddOnPlans();
      setAddOns(data);
    } catch (error) {
      toast.error("Error fetching add-ons");
    }
  };

  const handleStatusChange = (proposalId, status) => {
    setStatusUpdate((prev) => ({
      ...prev,
      [proposalId]: { status, addonId: "" },
    }));
  };

  const handleAddonChange = (proposalId, addonId) => {
    setStatusUpdate((prev) => ({
      ...prev,
      [proposalId]: { ...prev[proposalId], addonId },
    }));
  };

  const handleSubmit = async (proposalId) => {
    const { status, addonId } = statusUpdate[proposalId] || {};
    if (!status) {
      toast.error("Please select a status");
      return;
    }

    if (status === "Accepted" && !addonId) {
      toast.error("Please select an Add-On before accepting the proposal.");
      return;
    }

    try {
      await editProposalStatus(proposalId, status, addonId);
      toast.success("Proposal status updated");
      fetchProposals();
    } catch (error) {
      toast.error(
        "Error updating status: " + (error.response?.data || error.message)
      );
    }
  };

  return (
    <div className="edit-proposals-container">
      <button
        className="back-button-ep"
        onClick={() => navigate("/officer-home")}
      >
        Back to Home
      </button>
      <h2 className="title">Edit Proposal Status</h2>

      <div className="proposals-section">
        {proposals.map((proposal) => (
          <div key={proposal.proposalId} className="proposal-card">
            <p>
              <strong>Vehicle:</strong> {proposal.vehicle?.vehicleNumber}
            </p>
            <p>
              <strong>Current Status:</strong> {proposal.status}
            </p>

            <select
              value={statusUpdate[proposal.proposalId]?.status || ""}
              onChange={(e) =>
                handleStatusChange(proposal.proposalId, e.target.value)
              }
              className="dropdown"
            >
              <option value="">Select Status</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="DocumentsRequired">Documents Required</option>
            </select>

            {statusUpdate[proposal.proposalId]?.status === "Accepted" && (
              <select
                value={statusUpdate[proposal.proposalId]?.addonId || ""}
                onChange={(e) =>
                  handleAddonChange(proposal.proposalId, e.target.value)
                }
                className="dropdown"
              >
                <option value="">Select Add-On</option>
                {addOns.map((addon) => (
                  <option key={addon.addOnId} value={addon.addOnId}>
                    {addon.name} - ₹{addon.premiumAmount}
                  </option>
                ))}
              </select>
            )}

            <button
              className="update-button"
              onClick={() => handleSubmit(proposal.proposalId)}
            >
              Update Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditProposalStatus;


