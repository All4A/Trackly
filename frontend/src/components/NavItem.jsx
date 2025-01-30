import React from "react";
import "./NavItem.css";

export default function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`nav-item ${isActive ? "active" : "inactive"}`}
    >
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="icon"
      />
      <span className="label">{label}</span>
    </button>
  );
}