import React from "react";
import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="search-bar-container">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/49c34ec70e162672001023a51ddc083a3fc79842fcbed0bd70ee3f14c0f971d5?placeholderIfAbsent=true&apiKey=83f09f65141e45b4bd5a3a0e1157ad85"
        alt=""
        className="search-icon"
      />
      <label htmlFor="searchInput" className="sr-only">
        Search
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