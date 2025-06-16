import React, { useEffect, useState, useContext } from "react";
import { getUnpaidProposals, makePolicyPayment } from "../../../../services/ClientService";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./MakePayment.css";

const MakePayment = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [proposals, setProposals] = useState([]);
  const [selectedProposalId, setSelectedProposalId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const data = await getUnpaidProposals(userId);
        setProposals(data);
      } catch (error) {
        toast.error("You don't have any unpaid quotes");
      }
    };

    fetchProposals();
  }, [userId]);

  const handleProposalSelect = (proposalId, amount) => {
    setSelectedProposalId(proposalId);
    setPaymentAmount(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProposalId || !paymentAmount) {
      toast.warn("Please select a proposal to make a payment.");
      return;
    }

    try {
      await makePolicyPayment(selectedProposalId, {
        paymentAmount: parseFloat(paymentAmount),
      });
      toast.success("Payment successful!");
      setSelectedProposalId("");
      setPaymentAmount("");
    } catch (error) {
      toast.error("Payment failed: " + (error.response?.data || "Server error."));
    }
  };

  return (
    <div className="make-payment-page">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <div className="payment-container">
        <h2>Make Payment for Policy</h2>

        {proposals.length === 0 ? (
          <div className="no-proposals">
            <p>You have no quotes that require payment.</p>
          </div>
        ) : (
          <>
            <div className="proposal-card-container">
              {proposals.map((p) => (
                <div
                  key={p.proposalId}
                  className={`proposal-card ${selectedProposalId === p.proposalId ? "selected" : ""}`}
                  onClick={() => handleProposalSelect(p.proposalId, p.totalPremium)}
                >
                  <p><strong>Vehicle:</strong> {p.vehicleNumber} ({p.vehicleType})</p>
                  <p><strong>Base Premium:</strong> ₹{p.basePremiumAmount}</p>
                  <p><strong>Add-On Premium:</strong> ₹{p.addOnPremiumAmount}</p>
                  <p><strong>Total Premium:</strong> ₹{p.totalPremium}</p>
                  <p><strong>Quote Date:</strong> {new Date(p.quoteDate).toLocaleDateString()}</p>
                  <p><strong>Expiry Date:</strong> {new Date(p.expiryDate).toLocaleDateString()}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="payment-form">
              <label>
                Payment Amount:
                <input
                  type="number"
                  step="0.01"
                  value={paymentAmount}
                  readOnly
                />
              </label>
              <small className="note">This amount is based on your selected quote.</small>
              <button type="submit">Make Payment</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default MakePayment;



