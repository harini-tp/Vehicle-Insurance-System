import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  const login = ({ token, role, name }) => {
    const decoded = jwtDecode(token);
    const userId = decoded.UserId;

    setToken(token);
    setRole(role);
    setName(name);
    setUserId(userId);

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setToken("");
    setRole("");
    setName("");
    setUserId("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
  };

  useEffect(() => {
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, name, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};