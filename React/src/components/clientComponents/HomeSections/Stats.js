import React from "react";
import "../ClientHome.css";

const Stats = () => {
  return (
    <section className="section left-image">
      <div className="section-content">
        <h2>SafeWheels in Numbers</h2>
        <ul>
          <li>12,000+ Policies Issued</li>
          <li>9,000+ Active Users</li>
          <li>95% Claim Approval Rate</li>
          <li>4.8/5 Customer Satisfaction</li>
        </ul>
      </div>
      <div className="section-content">
        <img
          src="/images/stats.png"
          alt="SafeWheels Stats"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </div>
    </section>
  );
};

export default Stats;

