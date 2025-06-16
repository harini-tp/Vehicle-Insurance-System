import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css"; 

const Sidebar = ({ visible, onClose, handleLogout }) => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState({
    plans: false,
    vehicles: false,
    policies: false,
    myPolicies: false,
    claims: false,
    profile: false,
  });

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      <div className={`sidebar ${visible ? "show" : ""}`}>
        <h3 className="sidebar-title">Navigation</h3>

        {[
          ["plans", "View Plans", [
            ["/base-premium-plans", "Base Premium Plans"],
            ["/addons", "View Add-Ons"]
          ]],
          ["vehicles", "Vehicle Management", [
            ["/my-vehicles", "View My Vehicles"],
            ["/register-vehicle", "Register Vehicle"],
            ["/edit-vehicle", "Edit Vehicle Info"]
          ]],
          ["policies", "Policy Management", [
            ["/propose-policy", "Propose a Policy"],
            ["/proposal-status", "Proposal Status"],
            ["/view-quotes", "View My Quotes"],
            ["/download-summary", "Download Quote Summary"]
          ]],
          ["myPolicies", "My Policies", [
            ["/my-policies", "View My Policies"],
            ["/make-payment", "Make Payment"],
            ["/my-payments", "View My Payments"]
          ]],
          ["claims", "Claims", [
            ["/request-claim", "Request Claim"],
            ["/claim-status", "Claim Status"],
            ["/claim-payment-status", "Claim Payment Status"]
          ]],
          ["profile", "Profile", [
            ["/edit-user", "Edit Profile"],
            ["/upload-document", "Upload Document"]
          ]]
        ].map(([key, label, links]) => (
          <div className="sidebar-section" key={key}>
            <button className="sidebar-toggle" onClick={() => toggleSection(key)}>
              {label}
            </button>
            {expanded[key] && (
              <ul className="sidebar-submenu">
                {links.map(([path, text]) => (
                  <li key={path}>
                    <button onClick={() => navigate(path)}>{text}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <hr />
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {visible && <div className="sidebar-overlay" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar;

