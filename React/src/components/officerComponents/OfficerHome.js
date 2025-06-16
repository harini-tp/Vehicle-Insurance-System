import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./OfficerHome.css";
import { ChevronDown, ChevronUp } from "lucide-react";

const OfficerHome = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [officerName, setOfficerName] = useState("");
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const name = localStorage.getItem("name") || "Officer";
    setOfficerName(name);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = [
    {
      key: "plans",
      title: "Plans",
      actions: [
        { label: "Create Base Premium", path: "/create-basepremium" },
        { label: "Create Add-On", path: "/create-addon" },
      ],
    },
    {
      key: "proposals",
      title: "Policy Proposals",
      actions: [
        { label: "View Proposals", path: "/view-proposals" },
        { label: "Edit Proposal Status", path: "/edit-proposal-status" },
      ],
    },
    {
      key: "payments",
      title: "Payments",
      actions: [{ label: "View Payments", path: "/view-payments" }],
    },
    {
      key: "policies",
      title: "Policies",
      actions: [{ label: "View Policies", path: "/view-policies" }],
    },
    {
      key: "claims",
      title: "Claims",
      actions: [
        { label: "View Claim Requests", path: "/view-claim-requests" },
        { label: "Edit Claim Request Status", path: "/edit-claim-request-status" },
        { label: "View Claim Payments", path: "/view-claim-payments" },
        { label: "Edit Claim Payment Status", path: "/edit-claim-payment-status" },
      ],
    },
    {
      key: "documents",
      title: "Documents",
      actions: [
        { label: "View Documents", path: "/view-documents" },
        { label: "Get Document", path: "/get-document" },
      ],
    },
  ];

  return (
    <div className="officer-container">
      <header className="officer-header">
        <img src="/images/mylogo.jpeg" alt="Logo" className="logo" />
        <h1 className="company-name">SafeWheels</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <h2 className="welcome">Welcome, {officerName}</h2>

      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.key} className="category-card">
            <div className="card-header" onClick={() => toggleSection(cat.key)}>
              <h3>{cat.title}</h3>
              {openSections[cat.key] ? <ChevronUp /> : <ChevronDown />}
            </div>
            {openSections[cat.key] && (
              <div className="card-actions">
                {cat.actions.map((action, idx) => (
                  <button key={idx} onClick={() => navigateTo(action.path)}>
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficerHome;

