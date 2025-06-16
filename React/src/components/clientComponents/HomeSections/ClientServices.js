import React from "react";
import "../ClientHome.css";

const ClientServices = () => {
  return (
    <section className="section right-image">
      <div className="section-content">
        <h2>Client Services</h2>
        <p>Once you're logged in, you can perform the following actions:</p>
        <ul>
          <li>View and manage your vehicles</li>
          <li>Propose new insurance policies</li>
          <li>View policy quotes and summaries</li>
          <li>Make secure premium payments</li>
          <li>Request and track claims</li>
          <li>Edit personal and vehicle details</li>
          <li>Upload important documents</li>
          <li>Track payment and claim statuses</li>
        </ul>
      </div>
      <div className="section-content">
        <img
          src="/images/computer.png"
          alt="Client Services"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </div>
    </section>
  );
};

export default ClientServices;

