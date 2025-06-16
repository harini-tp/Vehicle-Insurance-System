import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { getProposalStatus } from "../../../../services/ClientService";
import { toast } from "react-toastify";
import "./ProposalStatus.css";

const CheckProposalStatus = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const data = await getProposalStatus(userId);
        setProposals(data);
        if (data.length === 0) {
          toast.info("You have made no proposal yet.");
        }
      } catch (error) {
        console.error(error);
        toast.error("You have made no proposal yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [userId]);

  return (
    <div className="proposal-status-page">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <div className="proposal-status-container">
        <h2>Your Policy Proposals</h2>

        {loading ? (
          <p>Loading proposals...</p>
        ) : proposals.length === 0 ? (
          <div className="no-proposals">
            <p>You have not proposed any policies yet.</p>
            <button onClick={() => navigate("/propose-policy")}>
              Propose a Policy
            </button>
          </div>
        ) : (
          <ul className="proposal-list">
            {proposals.map((proposal) => (
              <li key={proposal.proposalId} className="proposal-card">
                <p><strong>Vehicle:</strong> {proposal.vehicle?.vehicleNumber} ({proposal.vehicle?.vehicleType})</p>
                <p><strong>Date:</strong> {new Date(proposal.proposalDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {proposal.status}</p>
                <p>
                  <strong>Coverage:</strong> {proposal.basePremiumPlan?.coverageType} - ₹
                  {proposal.basePremiumPlan?.basePremiumAmount}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CheckProposalStatus;

