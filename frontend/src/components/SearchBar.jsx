import React from "react";
import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="search-bar-container">
      <img
        loading="lazy"
        src="search.png"
        alt=""
        className="search-icon"
      />
      <label htmlFor="searchInput" className="sr-only">

      </label>
      <input
        id="searchInput"
        type="search"
        placeholder="Search for something"
        className="search-input"
      />
    </div>
  );
}