import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import {
  getUserVehicles,
  proposePolicy,
} from "../../../../services/ClientService";
import { getBasePremiumPlans } from "../../../../services/DisplayService";
import { toast } from "react-toastify";
import "./ProposePolicy.css";

const ProposePolicy = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehicleData, planData] = await Promise.all([
          getUserVehicles(userId),
          getBasePremiumPlans(),
        ]);
        setVehicles(vehicleData);
        setPlans(planData);
      } catch (err) {
        console.error(err);
        toast.error("You have no vehicles registered yet");
      }
    };

    fetchData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedVehicleId || !selectedPlanId) {
      toast.error("Please select both a vehicle and a plan.");
      return;
    }

    const selectedVehicle = vehicles.find(v => v.vehicleId === selectedVehicleId);
    const selectedPlan = plans.find(p => p.basePremiumId === selectedPlanId);

    if (!selectedVehicle || !selectedPlan) {
      toast.error("Invalid selection. Please try again.");
      return;
    }

    if (selectedVehicle.vehicleType !== selectedPlan.vehicleType) {
      toast.error("Selected plan does not apply to this vehicle type.");
      return;
    }

    try {
      await proposePolicy(userId, {
        vehicleId: selectedVehicleId,
        basePremiumId: selectedPlanId,
      });
      toast.success("Policy proposal submitted successfully.");
      setSelectedVehicleId(null);
      setSelectedPlanId(null);
    } catch (error) {
      console.error(error);
      toast.error("Error submitting policy proposal.");
    }
  };

  return (
    <div className="propose-policy-page">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <div className="propose-policy-container">
        <h2>Propose a New Policy</h2>

        {vehicles.length === 0 ? (
          <div className="no-vehicle">
            <p>You don't have any registered vehicles.</p>
            <button onClick={() => navigate("/register-vehicle")}>
              Register Vehicle
            </button>
          </div>
        ) : (
          <>
            <h3>Select a Vehicle:</h3>
            <div className="card-grid">
              {vehicles.map((v) => (
                <div
                  key={v.vehicleId}
                  className={`card ${
                    selectedVehicleId === v.vehicleId ? "selected" : ""
                  }`}
                >
                  <p><strong>Type:</strong> {v.vehicleType}</p>
                  <p><strong>Number:</strong> {v.vehicleNumber}</p>
                  <p><strong>Make:</strong> {v.make}</p>
                  <p><strong>Model:</strong> {v.model}</p>
                  <p><strong>Year:</strong> {v.yearOfManufacture}</p>
                  <p><strong>Chassis:</strong> {v.chassisNumber}</p>
                  <button onClick={() => setSelectedVehicleId(v.vehicleId)}>
                    Select Vehicle
                  </button>
                </div>
              ))}
            </div>

            <h3>Select a Base Premium Plan:</h3>
            <div className="card-grid">
              {plans.map((p) => (
                <div
                  key={p.basePremiumId}
                  className={`card ${
                    selectedPlanId === p.basePremiumId ? "selected" : ""
                  }`}
                >
                  <p><strong>Vehicle Type:</strong> {p.vehicleType}</p>
                  <p><strong>Coverage Type:</strong> {p.coverageType}</p>
                  <p><strong>Amount:</strong> ₹{p.basePremiumAmount}</p>
                  <button onClick={() => setSelectedPlanId(p.basePremiumId)}>
                    Select Plan
                  </button>
                </div>
              ))}
            </div>

            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={!selectedVehicleId || !selectedPlanId}
            >
              Submit Proposal
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProposePolicy;

