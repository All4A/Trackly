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
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff468459569eb5cb75886dba6376949e254578ca5747be22f4dadce1a392ecc2?placeholderIfAbsent=true&apiKey=83f09f65141e45b4bd5a3a0e1157ad85"
            alt="Trackly logo"
          />
          <div>Trackly</div>
        </div>
      </div>
      <div className="overview">Overview</div>
      <div className="actions">
        <SearchBar className="search-bar" />
        <button aria-label="Notifications" className="button-secondary">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a81584adddc5b583c53a086198c572f0557904302b2b21ec8ac387f63007f91?placeholderIfAbsent=true&apiKey=83f09f65141e45b4bd5a3a0e1157ad85"
            alt=""
          />
        </button>
        <button aria-label="Messages" className="button-secondary">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/992ab53975b6baad5692aff137133c86c9c7ad0d781f049045ca48b2f2d4b7cd?placeholderIfAbsent=true&apiKey=83f09f65141e45b4bd5a3a0e1157ad85"
            alt=""
          />
        </button>
        <button aria-label="Profile" className="button-secondary">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/71dfebeac48ab087439ad2d55a7c8824207c2c4935bd2f54058d9f94bd319dbc?placeholderIfAbsent=true&apiKey=83f09f65141e45b4bd5a3a0e1157ad85"
            alt=""
          />
        </button>
      </div>
    </header>
  );
}