import React, { useEffect, useState } from "react";
import { getAddOnPlans } from "../../../../services/DisplayService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewAddOns.css";

const ViewAddOns = () => {
  const [addOns, setAddOns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddOns = async () => {
      try {
        const data = await getAddOnPlans();
        setAddOns(data);
      } catch (err) {
        console.error("Error fetching add-ons:", err);
        toast.error("Failed to load add-on plans.");
      }
    };

    fetchAddOns();
  }, []);

  return (
    <div className="addon-container">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <h2>Available Add-On Plans</h2>

      {addOns.length === 0 ? (
        <p className="no-data">No add-on plans available.</p>
      ) : (
        <div className="addon-grid">
          {addOns.map((addOn) => (
            <div className="addon-card" key={addOn.addOnId}>
              <p><strong>Name:</strong> {addOn.name}</p>
              <p><strong>Description:</strong> {addOn.description || "N/A"}</p>
              <p><strong>Premium:</strong> ₹{addOn.premiumAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAddOns;

