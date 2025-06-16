import React, { useState, useContext } from "react";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, role, name } = await AuthService.login({ email, password });
      login({ token, role, name }); 
      alert("Login successful");
      if (role === "Client") {
      navigate("/client-home");
      } 
      else if (role === "Officer") {
      navigate("/officer-home");
      } 
      else {
      navigate("/"); 
      }
    } 
    catch (err) {
    alert("Invalid login");
    }
  };

  return (
  <div className="login-page">
    <div
      className="left-section"
      style={{ backgroundImage: "url('/images/car-scenic.jpg')" }}
    >
      <div className="welcome-content">
        <h1>Welcome to <span>SafeWheels</span></h1>
        <p>Your trusted partner in vehicle insurance.</p>
      </div>
    </div>

    <div className="right-section">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          /><br/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          /><br/>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="signup-text">
          No account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  </div>
  );
};

export default LoginForm;