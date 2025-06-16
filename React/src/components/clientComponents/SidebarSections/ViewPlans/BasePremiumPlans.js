import React, { useEffect, useState } from "react";
import { getBasePremiumPlans } from "../../../../services/DisplayService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BasePremiumPlans.css";

const BasePremiumPlans = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getBasePremiumPlans();
        setPlans(data);
      } catch (err) {
        toast.error("Failed to load base premium plans.");
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="premium-container">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <h2>Base Premium Plans</h2>

      {plans.length === 0 ? (
        <p className="no-data">No base premium plans available.</p>
      ) : (
        <div className="plans-grid">
          {plans.map((plan) => (
            <div className="plan-card" key={plan.basePremiumId}>
              <p><strong>Vehicle Type:</strong> {plan.vehicleType}</p>
              <p><strong>Coverage Type:</strong> {plan.coverageType}</p>
              <p><strong>Coverage Amount:</strong> ₹{plan.coverageAmount}</p>
              <p><strong>Base Premium:</strong> ₹{plan.basePremiumAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BasePremiumPlans;

