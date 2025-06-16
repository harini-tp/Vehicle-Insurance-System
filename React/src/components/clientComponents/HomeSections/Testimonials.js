import React from "react";
import "../ClientHome.css";

const Testimonials = () => {
  return (
    <section>
      <h2>What Our Clients Say</h2>
      <div className="testimonials-container">
        <div className="testimonial-box">
          “I got my vehicle insured in just 10 minutes! SafeWheels is truly reliable.”
          <br />– Ramesh S., Pune
        </div>
        <div className="testimonial-box">
          “Their claim support is amazing. Got my claim in 3 days without hassle.”
          <br />– Anjali D., Delhi
        </div>
        <div className="testimonial-box">
          “Clear policies, helpful staff, smooth experience overall.”
          <br />– Kiran V., Bengaluru
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

