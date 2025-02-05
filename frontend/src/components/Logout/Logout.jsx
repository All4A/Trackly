import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("jwt-token");
    console.log("User logged out successfully");

    const timeoutId = setTimeout(() => {navigate("/"); }, 0);

    return () => clearTimeout(timeoutId);}, [navigate]);

  return <h1>Logging out...</h1>;
}