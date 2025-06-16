import React, { useEffect, useState, useContext } from "react";
import { getClaimPaymentStatus } from "../../../../services/ClientService";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ClaimPaymentStatus.css";

const ClaimPaymentStatus = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getClaimPaymentStatus(userId);
        setPayments(data);
      } catch (error) {
        setMessage("No claim payments found.");
        toast.error("No claim payments found.");
      }
    };

    fetchPayments();
  }, [userId]);

  return (
    <div className="claim-payment-page">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>
      <div className="claim-payment-container">
        <h2>Check Claim Payment Status</h2>

        {payments.length === 0 ? (
          <div className="no-payments">
            <p>No payments made. Please check the claim status.</p>
            <button onClick={() => navigate("/claim-status")}>
              Go to Claim Status
            </button>
          </div>
        ) : (
          <>
            <div className="payment-card-container">
              {payments.map((payment) => (
                <div key={payment.claimPaymentId} className="payment-card">
                  <p><strong>Approved Amount:</strong> ₹{payment.approvedAmount}</p>
                  <p><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleString()}</p>
                  <p><strong>Status:</strong> {payment.status}</p>
                </div>
              ))}
            </div>

            <div className="download-summary-navigation">
              <p>To download your policy summary:</p>
              <button onClick={() => navigate("/download-summary")}>
                Go to Download Summary
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClaimPaymentStatus;

