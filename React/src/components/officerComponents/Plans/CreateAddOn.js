import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAddOn } from "../../../services/OfficerService";
import { toast } from "react-toastify";
import "./CreateAddOn.css";

const CreateAddOn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    premiumAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        premiumAmount: parseFloat(formData.premiumAmount),
      };

      await createAddOn(payload);
      toast.success("Add-On created successfully!");
      setFormData({
        name: "",
        description: "",
        premiumAmount: "",
      });
    } catch (error) {
      console.error("Error creating add-on:", error);
      toast.error("Failed to create add-on.");
    }
  };

  return (
    <div className="create-addon-wrapper">
      <button className="back-button-addon" onClick={() => navigate("/officer-home")}>
        Back to Home
      </button>

      <div className="create-addon-container">
        <h2 className="form-title">Create Add-On</h2>
        <form className="addon-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Add-On Name"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            type="number"
            name="premiumAmount"
            value={formData.premiumAmount}
            onChange={handleChange}
            placeholder="Premium Amount"
            required
          />
          <button className="submit-button" type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAddOn;


