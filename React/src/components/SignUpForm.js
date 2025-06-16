import React, { useState } from "react";
import { registerUser } from "../services/ClientService";
import { Link } from "react-router-dom";
import "./SignUpForm.css";
import { validateForm } from "../utils/signUpValidation";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
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
  const [validationErrors, setValidationErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("Registration successful!");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await registerUser(formData);
      setShowPopup(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setPopupMessage("Registration failed. Try again.");
      setShowPopup(true);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-columns">
            <div className="left-column">
              <input name="fullName" placeholder="Full Name" onChange={handleChange} required className="signup-input" />
              <input name="address" placeholder="Address" onChange={handleChange} required className="signup-input" />
              <input name="dateOfBirth" type="date" onChange={handleChange} required className="signup-input" />
              <input name="aadhaarNumber" placeholder="Aadhaar (12 digits)" onChange={handleChange} required className="signup-input" />
            </div>
            <div className="right-column">
              <input name="panNumber" placeholder="PAN (10 digits)" onChange={handleChange} required className="signup-input" />
              <input name="phoneNumber" placeholder="Phone (10 digits)" onChange={handleChange} required className="signup-input" />
              <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="signup-input" />
              <input name="password" type="password" placeholder="Password (Min 8 Charecters)" onChange={handleChange} required className="signup-input" />
            </div>
          </div>
          <button type="submit" className="signup-button">Register</button>
        </form>

        {Object.values(validationErrors).map((err, idx) => (
          <div key={idx} style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
            {err}
          </div>
        ))}

        {showPopup && (
          <div className="popup-message">
            {popupMessage}
          </div>
        )}

        <p className="login-text">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default SignUpForm;