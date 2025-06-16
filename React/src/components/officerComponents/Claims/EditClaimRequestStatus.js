import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  viewClaimRequests,
  editClaimRequestStatus,
} from "../../../services/OfficerService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditClaimRequestStatus.css";

const statusOptions = ["Accepted", "Rejected", "MoreDocumentsRequired"];

const EditClaimStatus = () => {
  const [claimRequests, setClaimRequests] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const data = await viewClaimRequests();
        setClaimRequests(data);
      } catch (error) {
        toast.error("Failed to fetch claim requests.");
      }
    };

    fetchClaims();
  }, []);

  const handleStatusChange = (claimRequestId, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [claimRequestId]: newStatus,
    }));
  };

  const handleSubmit = async (claimRequestId) => {
    const selectedStatus = statusMap[claimRequestId];
    if (!selectedStatus) {
      toast.warn("Please select a status before submitting.");
      return;
    }

    try {
      await editClaimRequestStatus(claimRequestId, selectedStatus);
      toast.success("Status updated successfully.");
      setClaimRequests((prev) =>
        prev.map((cr) =>
          cr.claimRequestId === claimRequestId
            ? { ...cr, claimStatus: selectedStatus }
            : cr
        )
      );
    } catch (error) {
      toast.error("Error updating claim status.");
    }
  };

  return (
    <div className="edit-claims-container">
      <button onClick={() => navigate("/officer-home")} className="back-button-ecr">
        Back to Home
      </button>

      <h2 className="title">Edit Claim Request Status</h2>

      {claimRequests.length === 0 ? (
        <p className="no-data">No claim requests found.</p>
      ) : (
        <div className="claims-grid">
          {claimRequests.map((cr) => (
            <div key={cr.claimRequestId} className="claim-card">
              <p><strong>Policy:</strong> {cr.policy?.policyNumber}</p>
              <p><strong>Claim Date:</strong> {new Date(cr.dateOfClaim).toLocaleDateString()}</p>
              <p><strong>Current Status:</strong> {cr.claimStatus}</p>
              <p><strong>Amount:</strong> ₹{cr.claimAmountRequested}</p>
              <p><strong>Description:</strong> {cr.incidentDescription}</p>

              <div className="status-controls">
                <label>Select new status: </label>
                <select
                  value={statusMap[cr.claimRequestId] || ""}
                  onChange={(e) => handleStatusChange(cr.claimRequestId, e.target.value)}
                  className="status-dropdown"
                >
                  <option value="">-- Select Status --</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.replace(/([A-Z])/g, " $1").trim()}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleSubmit(cr.claimRequestId)}
                  className="submit-status-btn"
                >
                  Submit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditClaimStatus;


