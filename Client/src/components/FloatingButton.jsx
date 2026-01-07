import React from "react";
import { Link } from "react-router-dom";
import mapBg from "../assets/gokarna-map-bg.svg"; // put svg in src/assets/

export default function FloatingMapButton() {
  return (
    <Link to="/map" className="circular-image-button" aria-label="Open Gokarna map">
      <img src={mapBg} alt="Map" className="circular-image-button__image" />
      <div className="circular-image-button__tooltip">
        <span className="circular-image-button__title">Explore Map</span>
        <span className="circular-image-button__sub">Beaches • Treks</span>
      </div>
    </Link>
  );
}

