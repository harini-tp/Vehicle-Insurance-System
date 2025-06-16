import React, { useState, useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { registerVehicle } from "../../../../services/ClientService";
import { useNavigate } from "react-router-dom";
import "./RegisterVehicles.css";
import { toast } from "react-toastify";

const RegisterVehicle = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleNumber: "",
    make: "",
    model: "",
    yearOfManufacture: 2015,
    chassisNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerVehicle(userId, formData);
      toast.success("Vehicle registered successfully!");
      setFormData({
        vehicleType: "",
        vehicleNumber: "",
        make: "",
        model: "",
        yearOfManufacture: 2015,
        chassisNumber: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-vehicle-page">
      <button className="back-button" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>

      <div className="register-vehicle-container">
        <h2>Register a New Vehicle</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <input
            type="text"
            name="vehicleType"
            placeholder="Vehicle Type"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="make"
            placeholder="Make"
            value={formData.make}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="yearOfManufacture"
            placeholder="Year of Manufacture"
            value={formData.yearOfManufacture}
            onChange={handleChange}
            min={2010}
            max={2025}
            required
          />
          <input
            type="text"
            name="chassisNumber"
            placeholder="Chassis Number"
            value={formData.chassisNumber}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterVehicle;
