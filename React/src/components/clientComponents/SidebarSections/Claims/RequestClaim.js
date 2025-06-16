import React, { useEffect, useState, useContext } from "react";
import { getMyPolicies, requestClaim } from "../../../../services/ClientService";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./RequestClaim.css";

const RequestClaim = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [policies, setPolicies] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState("");
  const [selectedPolicyAmount, setSelectedPolicyAmount] = useState(0);
  const [incidentDescription, setIncidentDescription] = useState("");
  const [claimAmountRequested, setClaimAmountRequested] = useState("");

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const data = await getMyPolicies(userId);
        setPolicies(data);
      } catch (error) {
        toast.error("You have no policies to request a claim.");
      }
    };

    fetchPolicies();
  }, [userId]);

  const handlePolicySelect = (policyId, totalPremium) => {
    setSelectedPolicyId(policyId);
    setSelectedPolicyAmount(totalPremium);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedPolicyId ||
      incidentDescription.trim() === "" ||
      !claimAmountRequested ||
      isNaN(parseFloat(claimAmountRequested))
    ) {
      toast.warn("Please fill in all fields correctly.");
      return;
    }

    const requested = parseFloat(claimAmountRequested);
    if (requested > selectedPolicyAmount) {
      toast.error("Claim amount cannot exceed the policy's total premium.");
      return;
    }

    try {
      await requestClaim(parseInt(selectedPolicyId), {
        incidentDescription,
        claimAmountRequested: requested,
      });

      toast.success("Claim request submitted successfully.");
      setSelectedPolicyId("");
      setSelectedPolicyAmount(0);
      setIncidentDescription("");
      setClaimAmountRequested("");
    } catch (error) {
      toast.error(
        "Failed to submit claim: " +
          (typeof error.response?.data === "string"
            ? error.response.data
            : JSON.stringify(error.response?.data) || "Server error.")
      );
    }
  };

  return (
    <div className="request-claim-page">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <div className="claim-container">
        <h2>Request a Claim</h2>

        {policies.length === 0 ? (
          <div className="no-policies">
            <p>You have no policies to request a claim.</p>
            <button onClick={() => navigate("/propose-policy")}>
              Propose a Policy
            </button>
          </div>
        ) : (
          <>
            <div className="policy-card-container">
              {policies.map((p) => (
                <div
                  key={p.policyId}
                  className={`policy-card ${
                    selectedPolicyId === p.policyId ? "selected" : ""
                  }`}
                  onClick={() =>
                    handlePolicySelect(p.policyId, p.totalPremium)
                  }
                >
                  <p><strong>Policy No:</strong> #{p.policyNumber}</p>
                  <p><strong>Vehicle:</strong> {p.vehicleNumber} ({p.vehicleType})</p>
                  <p><strong>Total Premium:</strong> ₹{p.totalPremium}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="claim-form">
              <div className="form-group">
                <label htmlFor="incident">Incident Description:</label>
                <textarea
                  id="incident"
                  value={incidentDescription}
                  onChange={(e) => setIncidentDescription(e.target.value)}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Claim Amount Requested:</label>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={claimAmountRequested}
                  onChange={(e) => setClaimAmountRequested(e.target.value)}
                  required
                />
              </div>

              <button type="submit">Submit Claim</button>
            </form>

          </>
        )}
      </div>
    </div>
  );
};

export default RequestClaim;

