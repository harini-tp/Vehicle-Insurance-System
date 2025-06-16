import React, { useEffect, useState, useContext } from "react";
import { getClaimStatus } from "../../../../services/ClientService";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ClaimStatus.css";

const ClaimStatus = () => {
  const { userId } = useContext(AuthContext);
  const [claims, setClaims] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const data = await getClaimStatus(userId);
        if (data.length === 0) {
          toast.info("You have no claim requests.");
        }
        setClaims(data);
      } catch (error) {
        toast.error("You have no claim requests.");
      }
    };

    fetchClaims();
  }, [userId]);

  return (
  <div className="claim-status-page">
    <button className="back-button" onClick={() => navigate("/client-home")}>
      Back to Home
    </button>
    <div className="claim-status-container">
      <h2>Check Claim Request Status</h2>

      {claims.length === 0 ? (
        <div className="no-claims">
          <p>You have made no claim requests.</p>
          <button onClick={() => navigate("/request-claim")}>
            Request a Claim
          </button>
        </div>
      ) : (
        <>
          <div className="claim-card-container">
            {claims.map((claim) => (
              <div key={claim.claimRequestId} className="claim-card">
                <p><strong>Date of Claim:</strong> {new Date(claim.dateOfClaim).toLocaleString()}</p>
                <p><strong>Incident Description:</strong> {claim.incidentDescription}</p>
                <p><strong>Status:</strong> {claim.claimStatus}</p>
                <p><strong>Requested Amount:</strong> ₹{claim.claimAmountRequested}</p>
              </div>
            ))}
          </div>

          <div className="claim-payment-navigation">
            <p>To view the payment status for your claims:</p>
            <button onClick={() => navigate("/claim-payment-status")}>
              View Claim Payment Status
            </button>
          </div>
        </>
      )}
    </div>
  </div>
  );
};

export default ClaimStatus;
