import React from "react";
import "../ClientHome.css";

const AboutSection = () => {
  return (
    <section className="section left-image">
      <div className="section-content">
        <h2>About SafeWheels</h2>
        <p>
          SafeWheels is committed to providing affordable and comprehensive insurance solutions 
          for vehicle owners across the country. Our mission is to ensure that every journey 
          is protected with trust, transparency, and technology.
        </p>
      </div>
      <div className="section-content">
        <img
          src="/images/city.png"
          alt="SafeWheels"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </div>
    </section>
  );
};

export default AboutSection;

