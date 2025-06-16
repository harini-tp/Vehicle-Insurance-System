import React, { useEffect, useState } from "react";
import { getPayments } from "../../../services/OfficerService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ViewPayments.css"; // add this file

const ViewPayments = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await getPayments();
      setPayments(data);
    } catch (error) {
      toast.error("Failed to fetch payment records");
    }
  };

  return (
    <div className="payments-container">
      <button className="back-button-vp" onClick={() => navigate("/officer-home")}>
        Back to Home
      </button>
      <h2 className="title">All Payments</h2>

      {payments.length === 0 ? (
        <p className="no-data">No payments found.</p>
      ) : (
        <div className="payments-grid">
          {payments.map((payment) => (
            <div key={payment.paymentId} className="payment-card">
              <p>
                <strong>Payment Date:</strong>{" "}
                {new Date(payment.paymentDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Amount:</strong> ₹{payment.paymentAmount}
              </p>
              <p>
                <strong>Status:</strong> {payment.paymentStatus}
              </p>

              {payment.quote && (
                <>
                  <p>
                    <strong>Quote Total Premium:</strong> ₹
                    {payment.quote.totalPremium}
                  </p>
                  <p>
                    <strong>Base Premium:</strong> ₹
                    {payment.quote.basePremiumAmount}
                  </p>
                  <p>
                    <strong>Add-On Premium:</strong> ₹
                    {payment.quote.addOnPremiumAmount}
                  </p>
                  <p>
                    <strong>Quote Expiry:</strong>{" "}
                    {new Date(payment.quote.expiryDate).toLocaleDateString()}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPayments;


