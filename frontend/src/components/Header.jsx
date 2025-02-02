import React from "react";
import SearchBar from "./SearchBar";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo-text">
          <img
            loading="lazy"
            src="trackly_logo.png"
            alt="Trackly logo"
          />
          <div>Trackly</div>
        </div>
      </div>
      <div className="overview">Overview</div>
      <div className="actions">
        <SearchBar className="search-bar" />
        <button aria-label="Settings" className="button-secondary">
          <img
            loading="lazy"
            src="settings.png"
            alt=""
          />
        </button>
        <button aria-label="Notifications" className="button-secondary">
          <img
            loading="lazy"
            src="notifications.png"
            alt=""
          />
        </button>
        <button aria-label="Profile" className="button-secondary">
          <img
            loading="lazy"
            src="profile.png"
            alt=""
          />
        </button>
      </div>
    </header>
  );
}