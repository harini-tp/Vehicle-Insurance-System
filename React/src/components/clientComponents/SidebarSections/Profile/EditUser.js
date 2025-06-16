import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { editUserDetails } from "../../../../services/ClientService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./EditUser.css";

const EditUser = () => {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    dateOfBirth: "",
    aadhaarNumber: "",
    panNumber: "",
    phoneNumber: "",
    email: "",
    password: "",
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
    const payload = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== "")
    );

    if (Object.keys(payload).length === 0) {
      toast.warn("Please enter at least one field to update.");
      return;
    }

    try {
      await editUserDetails(userId, payload);
      toast.success("User details updated successfully.");
      setFormData({
        fullName: "",
        address: "",
        dateOfBirth: "",
        aadhaarNumber: "",
        panNumber: "",
        phoneNumber: "",
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(
        "Failed to update details: " +
          (error.response?.data || "Server error.")
      );
    }
  };

  return (
  <div className="edit-user-page">
    <div className="edit-user-container">
      <button className="back-button-inside" onClick={() => navigate("/client-home")}>
        Back to Home
      </button>
      <h2>Edit User Profile</h2>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="form-column">
          <label>
            Full Name:
            <input name="fullName" value={formData.fullName} onChange={handleChange} />
          </label>
          <label>
            Date of Birth:
            <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
          </label>
          <label>
            PAN Number:
            <input name="panNumber" value={formData.panNumber} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input name="email" type="email" value={formData.email} onChange={handleChange} />
          </label>
        </div>
        <div className="form-column">
          <label>
            Address:
            <input name="address" value={formData.address} onChange={handleChange} />
          </label>
          <label>
            Aadhaar Number:
            <input name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} />
          </label>
          <label>
            Phone Number:
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input name="password" type="password" value={formData.password} onChange={handleChange} />
          </label>
        </div>
        <div className="form-submit">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  </div>
);

};

export default EditUser;
