import React, { useEffect, useState, useContext } from "react";
import { getMyPayments } from "../../../../services/ClientService";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./MyPayments.css";

const MyPayments = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getMyPayments(userId);
        setPayments(data);
      } catch (error) {
        toast.error("You have no payments.");
      }
    };

    fetchPayments();
  }, [userId]);

  return (
    <div className="my-payments-page">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <div className="payments-container">
        <h2>My Past Payments</h2>

        {payments.length === 0 ? (
          <div className="no-payments">
            <p>You have not made any payments yet.</p>
            <button onClick={() => navigate("/make-payment")}>
              Make a Payment
            </button>
          </div>
        ) : (
          <div className="payment-card-container">
            {payments.map((p, index) => (
              <div className="payment-card" key={index}>
                <p><strong>Status:</strong> {p.paymentStatus}</p>
                <p><strong>Amount Paid:</strong> ₹{p.paymentAmount}</p>
                <p><strong>Paid On:</strong> {new Date(p.paymentDate).toLocaleDateString()}</p>
                <p><strong>Base Premium:</strong> ₹{p.basePremiumAmount}</p>
                <p><strong>Add-On Premium:</strong> ₹{p.addOnPremiumAmount}</p>
                <p><strong>Total Premium:</strong> ₹{p.totalPremium}</p>
                <p><strong>Vehicle:</strong> {p.vehicleNumber} ({p.vehicleType})</p>
                <p><strong>Quote Date:</strong> {new Date(p.quoteDate).toLocaleDateString()}</p>
                <p><strong>Quote Expiry:</strong> {new Date(p.quoteExpiry).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPayments;

