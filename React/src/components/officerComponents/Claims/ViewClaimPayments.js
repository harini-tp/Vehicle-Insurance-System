import React, { useEffect, useState } from "react";
import { viewClaimPayments, viewClaimRequests } from "../../../services/OfficerService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./ViewClaimPayments.css";

const ViewClaimPayments = () => {
  const [claimPayments, setClaimPayments] = useState([]);
  const [claimRequests, setClaimRequests] = useState([]);
  const [selectedClaimRequest, setSelectedClaimRequest] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();

  const statusOptions = [
    { label: "Transaction Pending", value: "Transaction Pending" },
    { label: "Transaction Completed", value: "TransactionCompleted" },
    { label: "Transaction Failed", value: "TransactionFailed" },
  ];

  const fetchPayments = async (filters = {}) => {
    try {
      const data = await viewClaimPayments(filters.claimRequestId, filters.status);
      setClaimPayments(data);
    } catch (err) {
      setClaimPayments([]);
      toast.error("No data for this search.");
    }
  };

  useEffect(() => {
    fetchPayments();
    (async () => {
      try {
        const requests = await viewClaimRequests();
        setClaimRequests(requests);
      } catch (err) {
        toast.error("Error loading claim requests");
      }
    })();
  }, []);

  const handleSearch = () => {
    const filters = {
      claimRequestId: selectedClaimRequest || null,
      status: selectedStatus || null,
    };
    fetchPayments(filters);
  };

  return (
    <div className="claim-payments-container">
      <button onClick={() => navigate("/officer-home")} className="back-button-vcp">
        Back to Home
      </button>

      <h2 className="title">Claim Payments</h2>

      <div className="filter-bar">
        <div className="filter-group">
          <label>Claim Request</label>
          <select
            value={selectedClaimRequest}
            onChange={(e) => setSelectedClaimRequest(e.target.value)}
            className="dropdown"
          >
            <option value="">Select Claim Request</option>
            {claimRequests.map((cr) => (
              <option key={cr.claimRequestId} value={cr.claimRequestId}>
                Claim #{cr.claimRequestId}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="dropdown"
          >
            <option value="">Select Status</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {claimPayments.length === 0 ? (
        <p className="no-data">No claim payments found.</p>
      ) : (
        <div className="payments-grid">
          {claimPayments.map((payment) => (
            <div key={payment.claimPaymentId} className="payment-card">
              <p><strong>Claim Payment ID:</strong> {payment.claimPaymentId}</p>
              <p><strong>Claim Request ID:</strong> {payment.claimRequestId}</p>
              <p><strong>Approved Amount:</strong> ₹{payment.approvedAmount}</p>
              <p><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {payment.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewClaimPayments;


