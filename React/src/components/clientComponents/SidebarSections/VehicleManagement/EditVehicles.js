import React, { useEffect, useState, useContext } from "react";
import { getUserVehicles, updateVehicleDetails } from "../../../../services/ClientService";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditVehicles.css";

const EditVehicle = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleNumber: "",
    make: "",
    model: "",
    yearOfManufacture: "",
    chassisNumber: "",
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getUserVehicles(userId);
        setVehicles(data);
      } catch (error) {
        setVehicles([]); // Ensure empty fallback
      }
    };
    fetchVehicles();
  }, [userId]);

  useEffect(() => {
    if (selectedVehicleId) {
      const selected = vehicles.find(v => v.vehicleId === parseInt(selectedVehicleId));
      if (selected) {
        setFormData({
          vehicleType: selected.vehicleType || "",
          vehicleNumber: selected.vehicleNumber || "",
          make: selected.make || "",
          model: selected.model || "",
          yearOfManufacture: selected.yearOfManufacture || "",
          chassisNumber: selected.chassisNumber || "",
        });
      }
    }
  }, [selectedVehicleId, vehicles]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVehicleId) {
      toast.warn("Please select a vehicle.");
      return;
    }

    try {
      await updateVehicleDetails(parseInt(selectedVehicleId), formData);
      toast.success("Vehicle details updated successfully.");
    } catch (error) {
      toast.error("Error updating vehicle.");
    }
  };

  return (
    <div className="edit-vehicle-container">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <h2>Edit Vehicle Details</h2>

      {vehicles.length === 0 ? (
        <div className="message-container">
          <p>You have no vehicle registered to be edited.</p>
          <button onClick={() => navigate("/register-vehicle")}>
            Register Vehicle
          </button>
        </div>
      ) : (
        <>
          <div className="dropdown-container">
            <label>Select a Vehicle: </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
            >
              <option value="">-- Select Vehicle --</option>
              {vehicles.map((v) => (
                <option key={v.vehicleId} value={v.vehicleId}>
                  {v.vehicleNumber} ({v.vehicleType})
                </option>
              ))}
            </select>
          </div>

          {selectedVehicleId && (
            <form onSubmit={handleSubmit} className="vehicle-form">
              <div className="form-column">
                <label>Vehicle Type:
                  <input name="vehicleType" value={formData.vehicleType} onChange={handleChange} />
                </label>

                <label>Make:
                  <input name="make" value={formData.make} onChange={handleChange} />
                </label>

                <label>Year of Manufacture:
                  <input
                    type="number"
                    name="yearOfManufacture"
                    value={formData.yearOfManufacture}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="form-column">
                <label>Vehicle Number:
                  <input name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} />
                </label>

                <label>Model:
                  <input name="model" value={formData.model} onChange={handleChange} />
                </label>

                <label>Chassis Number:
                  <input name="chassisNumber" value={formData.chassisNumber} onChange={handleChange} />
                </label>
              </div>

              <div className="form-actions">
                <button type="submit">Update Vehicle</button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default EditVehicle;


