import React from "react";
import { Link } from "react-router-dom";
import "./NavItem.css";

export default function NavItem({ icon, label, isActive, to }) {
  return (
    <Link
      to={to}
      className={`nav-item ${isActive ? "active" : "inactive"}`}
    >
      <img
        loading="lazy"
        src={icon}
        alt={label} // Add an accessible alt text
        className="icon"
      />
      <span className="label">{label}</span>
    </Link>
  );
}