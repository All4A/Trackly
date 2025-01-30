import React from "react";
import "./styles/HobbyGrid.css";

export default function HobbyGrid({ images }) {
  return (
    <div className="hobby-grid">
      {images.map((image) => (
        <div key={image.id} className="hobby-card">
          <img
            loading="lazy"
            src={image.imageSrc}
            alt={image.alt}
          />
        </div>
      ))}
    </div>
  );
}