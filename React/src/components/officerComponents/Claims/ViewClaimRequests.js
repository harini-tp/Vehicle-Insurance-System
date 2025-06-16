import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { viewClaimRequests } from "../../../services/OfficerService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewClaimRequests.css";

const ViewClaimRequests = () => {
  const [claimRequests, setClaimRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllClaims = async () => {
      try {
        const data = await viewClaimRequests();
        setClaimRequests(data);
      } catch (error) {
        toast.error("Failed to fetch claim requests.");
      }
    };

    fetchAllClaims();
  }, []);

  return (
    <div className="claims-container">
      <button className="back-button-vcr" onClick={() => navigate("/officer-home")}>
        Back to Home
      </button>

      <h2 className="title">Claim Requests</h2>

      {claimRequests.length === 0 ? (
        <p className="no-data">No claim requests found.</p>
      ) : (
        <div className="claims-grid">
          {claimRequests.map((cr) => (
            <div key={cr.claimRequestId} className="claim-card">
              <p><strong>Policy:</strong> {cr.policy?.policyNumber}</p>
              <p><strong>Claim Date:</strong> {new Date(cr.dateOfClaim).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {cr.claimStatus}</p>
              <p><strong>Requested Amount:</strong> ₹{cr.claimAmountRequested}</p>
              <p><strong>Description:</strong> {cr.incidentDescription}</p>
            </div>
          ))}
        </div>
      )}
      <div className="bottom-section">
        <p>To update the status of a claim request:</p>
        <button onClick={() => navigate("/edit-claim-request-status")} className="edit-status-btn">
          Edit Claim Status
        </button>
      </div>
    </div>
  );
};

export default ViewClaimRequests;




