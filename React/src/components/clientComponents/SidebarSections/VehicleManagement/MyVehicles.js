import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { getUserVehicles } from "../../../../services/ClientService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./MyVehicles.css";

const MyVehicles = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getUserVehicles(userId);
        setVehicles(data);
        if (data.length === 0) setMessage("No vehicles found.");
      } catch (error) {
        console.error(error);
        toast.error("You have no vehicles yet");
        setMessage("No vehicles found.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [userId]);

  return (
    <div className="my-vehicles-page">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <div className="my-vehicles-container">
        <h2>My Registered Vehicles</h2>

        {loading ? (
          <p>Loading...</p>
        ) : message ? (
          <>
            <p className="no-vehicle-text">{message}</p>
            <button className="action-button" onClick={() => navigate("/register-vehicle")}>
              Add a Vehicle
            </button>
          </>
        ) : (
          <>
            <div className="vehicle-list">
              {vehicles.map((vehicle, index) => (
                <div key={index} className="vehicle-card">
                  <p><strong>Type:</strong> {vehicle.vehicleType}</p>
                  <p><strong>Number:</strong> {vehicle.vehicleNumber}</p>
                  <p><strong>Make:</strong> {vehicle.make}</p>
                  <p><strong>Model:</strong> {vehicle.model}</p>
                  <p><strong>Year:</strong> {vehicle.yearOfManufacture}</p>
                  <p><strong>Chassis:</strong> {vehicle.chassisNumber}</p>
                </div>
              ))}
            </div>
            <div className="propose-policy-section">
              <p>Want to propose a policy for your vehicles?</p>
              <button className="action-button" onClick={() => navigate("/propose-policy")}>
                Propose Policy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyVehicles;

