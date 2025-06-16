import React, { useEffect, useState } from "react";
import { viewClaimPayments, viewClaimRequests, editClaimPaymentStatus } from "../../../services/OfficerService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./EditClaimPaymentStatus.css";

const statusOptions = [
  { label: "Transaction Completed", value: "TransactionCompleted" },
  { label: "Transaction Failed", value: "TransactionFailed" },
];

const ViewEditClaimPayments = () => {
  const [claimPayments, setClaimPayments] = useState([]);
  const [claimRequests, setClaimRequests] = useState([]);
  const [filterClaimRequestId, setFilterClaimRequestId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState({});

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await viewClaimPayments(filterClaimRequestId, filterStatus);
      setClaimPayments(data);
    } catch (err) {
      toast.error("Error fetching claim payments");
    }
  };

  const fetchClaimRequests = async () => {
    try {
      const data = await viewClaimRequests(null, null);
      setClaimRequests(data);
    } catch (err) {
      toast.error("Error fetching claim requests");
    }
  };

  useEffect(() => {
    fetchData();
    fetchClaimRequests();
  }, []);

  const handleStatusChange = (paymentId, statusValue) => {
    setSelectedStatuses((prev) => ({ ...prev, [paymentId]: statusValue }));
  };

  const handleSubmit = async (paymentId) => {
    const newStatus = selectedStatuses[paymentId];
    if (!newStatus) {
      toast.warning("Please select a status");
      return;
    }

    try {
      await editClaimPaymentStatus(paymentId, newStatus);
      toast.success("Claim payment status updated");
      setClaimPayments((prev) =>
        prev.map((p) =>
          p.claimPaymentId === paymentId
            ? {
                ...p,
                status: newStatus.replace(/([A-Z])/g, " $1").trim(),
              }
            : p
        )
      );
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="edit-claim-container">
      <button className="back-btn-ecp" onClick={() => navigate("/officer-home")}>
        Back to Home
      </button>

      <h2 className="edit-title">View & Edit Claim Payments</h2>

      <div className="edit-filter-bar">
        <div className="edit-filter-group">
          <label>Claim Request</label>
          <select
            value={filterClaimRequestId}
            onChange={(e) => setFilterClaimRequestId(e.target.value)}
            className="edit-dropdown"
          >
            <option value="">All Claim Requests</option>
            {claimRequests.map((req) => (
              <option key={req.claimRequestId} value={req.claimRequestId}>
                ID: {req.claimRequestId} - ₹{req.claimAmountRequested}
              </option>
            ))}
          </select>
        </div>

        <div className="edit-filter-group">
          <label>Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="edit-dropdown"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <button onClick={fetchData} className="edit-search-btn">
          Search
        </button>
      </div>

      {claimPayments.length === 0 ? (
        <p className="edit-no-data">No claim payments found.</p>
      ) : (
        <div className="edit-payment-grid">
          {claimPayments.map((p) => (
            <div key={p.claimPaymentId} className="edit-payment-card">
              <p><strong>Claim Payment ID:</strong> {p.claimPaymentId}</p>
              <p><strong>Claim Request ID:</strong> {p.claimRequestId}</p>
              <p><strong>Approved Amount:</strong> ₹{p.approvedAmount}</p>
              <p><strong>Payment Date:</strong> {new Date(p.paymentDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {p.status}</p>

              <div className="edit-action-row">
                <select
                  value={selectedStatuses[p.claimPaymentId] || ""}
                  onChange={(e) => handleStatusChange(p.claimPaymentId, e.target.value)}
                  className="edit-dropdown"
                >
                  <option value="">--Select Status--</option>
                  {statusOptions.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleSubmit(p.claimPaymentId)}
                  className="edit-submit-btn"
                >
                  Submit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewEditClaimPayments;


