import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBasePremium } from "../../../services/OfficerService";
import { toast } from "react-toastify";
import "./CreateBasePremium.css";

const CreateBasePremium = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleType: "",
    coverageType: "",
    coverageAmount: "",
    basePremiumAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        vehicleType: formData.vehicleType,
        coverageType: formData.coverageType,
        coverageAmount: parseFloat(formData.coverageAmount),
        basePremiumAmount: parseFloat(formData.basePremiumAmount),
      };

      await createBasePremium(payload);
      toast.success("Base premium created successfully!");
      setFormData({
        vehicleType: "",
        coverageType: "",
        coverageAmount: "",
        basePremiumAmount: "",
      });
    } catch (error) {
      console.error("Error creating base premium:", error);
      toast.error("Failed to create base premium.");
    }
  };

  return (
    <div className="create-base-wrapper">
      <button className="back-button-bp" onClick={() => navigate("/officer-home")}>
        Back to Home
      </button>

      <div className="create-base-container">
        <h2 className="form-title">Create Base Premium</h2>
        <form className="base-premium-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            placeholder="Vehicle Type"
            required
          />
          <input
            type="text"
            name="coverageType"
            value={formData.coverageType}
            onChange={handleChange}
            placeholder="Coverage Type"
            required
          />
          <input
            type="number"
            name="coverageAmount"
            value={formData.coverageAmount}
            onChange={handleChange}
            placeholder="Coverage Amount"
            required
          />
          <input
            type="number"
            name="basePremiumAmount"
            value={formData.basePremiumAmount}
            onChange={handleChange}
            placeholder="Base Premium Amount"
            required
          />
          <button className="submit-button" type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBasePremium;


