import React from "react";
import "../ClientHome.css";

const ContactSection = () => {
  return (
    <section className="section right-image">
      <div className="section-content">
        <h2>Contact Us</h2>
        <p>
          SafeWheels Insurance Pvt. Ltd.<br />
          123, Policy Avenue, Chennai, India
        </p>
        <p>
          Phone: +91-9876543210<br />
          Email: support@safewheels.com
        </p>
        <p>
          We’re available Monday to Saturday, 9 AM – 6 PM.
        </p>
      </div>
      <div className="section-content">
        <img
          src="/images/contact.png"
          alt="Contact Us"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </div>
    </section>
  );
};

export default ContactSection;

