import React from "react";
import "../ClientHome.css";

const WhyChooseUs = () => {
  return (
    <section className="section right-image">
      <div className="section-content">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Quick claim settlement process</li>
          <li>24/7 customer support</li>
          <li>Competitive premium rates</li>
          <li>Trusted by over 10,000 clients</li>
        </ul>
      </div>
      <div className="section-content">
        <img
          src="/images/towing.png"
          alt="Why Choose Us"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </div>
    </section>
  );
};

export default WhyChooseUs;

