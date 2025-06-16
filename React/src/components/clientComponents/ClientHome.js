import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "./Sidebar";
import "./ClientHome.css";

import AboutSection from "./HomeSections/AboutSection";
import WhyChooseUs from "./HomeSections/WhyChooseUs";
import TeamAndPolicies from "./HomeSections/TeamAndPolicies";
import ClientServices from "./HomeSections/ClientServices";
import Stats from "./HomeSections/Stats";
import Testimonials from "./HomeSections/Testimonials";
import ContactSection from "./HomeSections/ContactSection";

const ClientHome = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) setUserName(name);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="client-home">
      <div className="top-nav-client">
        <div className="nav-left">
          <img src="/images/mylogo.jpeg" alt="Logo" className="nav-logo-client" />
          <span className="nav-title-client">SafeWheels</span>
        </div>
        <div className="nav-right">
          <span className="nav-menu-icon" onClick={() => setSidebarVisible(!sidebarVisible)}>
            ☰
          </span>
        </div>
      </div>

      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        handleLogout={handleLogout}
      />

      <div className="home-body-client">
        <div className="home-content-client">
          <p className="welcome-message">
            Welcome, {userName || "Guest"}! Explore our services below.
          </p>

          <AboutSection />
          <WhyChooseUs />
          <TeamAndPolicies />
          <ClientServices />
          <Stats />
          <Testimonials />
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default ClientHome;
