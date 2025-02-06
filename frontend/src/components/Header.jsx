import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Header.css";

export default function Header() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const jwtToken = JSON.parse(localStorage.getItem("jwt-token"));

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        if (!jwtToken) {
          throw new Error("JWT token not found.");
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/avatar`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile picture.");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setPreviewUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        setError(error.message || "An error occurred while fetching the profile picture.");
      }
    };

    fetchProfilePicture();
  }, []);

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/dashboard" className="logo-link">
          <div className="logo-text">
            <img
              loading="lazy"
              src="trackly_logo.png"
              alt="Trackly logo"
            />
            <div>Trackly</div>
          </div>
        </Link>
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
        <Link to="/accounts" aria-label="Profile" className="button-secondary">
          <img
            loading="lazy"
            src={previewUrl || "profile.png"}
            alt="Profile"
            className="profile-picture-sm"
          />
        </Link>
      </div>
      {error && <div className="error-message">{error}</div>}
    </header>
  );
}