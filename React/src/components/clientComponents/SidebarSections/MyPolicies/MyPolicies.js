import React, { useEffect, useState, useContext } from "react";
import { getMyPolicies } from "../../../../services/ClientService";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./MyPolicies.css";

const MyPolicies = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const data = await getMyPolicies(userId);
        if (data.length === 0) {
          toast.info("You have no policies yet.");
        }
        setPolicies(data);
      } catch (error) {
        toast.error("You have no policies yet.");
      }
    };

    fetchPolicies();
  }, [userId]);

  return (
    <div className="my-policies-page">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <div className="policy-container">
        <h2>My Policies</h2>

        {policies.length === 0 ? (
          <p className="no-policy-text">You have no policies yet.</p>
        ) : (
          <>
            <div className="policy-card-container">
              {policies.map((policy, index) => (
                <div key={index} className="policy-card">
                  <p><strong>Policy Number:</strong> {policy.policyNumber}</p>
                  <p><strong>Status:</strong> {policy.status}</p>
                  <p><strong>Active:</strong> {new Date(policy.activationDate).toLocaleDateString()}</p>
                  <p><strong>Expires:</strong> {new Date(policy.expiryDate).toLocaleDateString()}</p>
                  <p><strong>Vehicle:</strong> {policy.vehicleNumber} ({policy.vehicleType})</p>
                  <p><strong>Base Premium:</strong> ₹{policy.basePremiumAmount}</p>
                  <p><strong>Add-On Premium:</strong> ₹{policy.addOnPremiumAmount}</p>
                  <p><strong>Total Premium:</strong> ₹{policy.totalPremium}</p>
                  <p><strong>Quote Date:</strong> {new Date(policy.quoteDate).toLocaleDateString()}</p>
                  <p><strong>Quote Expiry:</strong> {new Date(policy.quoteExpiry).toLocaleDateString()}</p>
                </div>
              ))}
            </div>

            <div className="claim-section">
              <p>Want to request a claim for one of your policies?</p>
              <button onClick={() => navigate("/request-claim")}>
                Go to Request Claim
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyPolicies;

