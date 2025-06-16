import React from "react";
import "../ClientHome.css";

const TeamAndPolicies = () => {
  return (
    <section className="section left-image">
      <div className="section-content">
        <h2>Meet Our Team</h2>
        <p>
          Our expert team of underwriters, claim handlers, and support professionals work
          tirelessly to keep you safe on the road.
        </p>

        <h3>Our Insurance Policies</h3>
        <ul>
          <li>Comprehensive Car Insurance</li>
          <li>Two-Wheeler Protection Plan</li>
          <li>Personal Accident Cover</li>
          <li>Add-On Packages</li>
        </ul>
      </div>
      <div className="section-content">
        <img
          src="/images/aggrement.png"
          alt="Team and Policies"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </div>
    </section>
  );
};

export default TeamAndPolicies;

