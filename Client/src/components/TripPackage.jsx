import React, { useState } from "react";
import "../styles/TripPlanner.css";

const ACTIVITY_CONFIG = {
  stay: {
    name: "Stay",
    options: [
      { id: "hostel", name: "Hostel", price: "₹800/night", icon: "🏠" },
      { id: "beach-hut", name: "Beach Hut", price: "₹1500/night", icon: "🌴" },
      { id: "resort", name: "Resort", price: "₹3500/night", icon: "🏖️" },
      { id: "homestay", name: "Homestay", price: "₹1200/night", icon: "🏡" },
    ],
  },
  transport: {
    name: "Transport",
    options: [
      { id: "bus", name: "Bus", price: "₹600", icon: "🚌" },
      { id: "train", name: "Train", price: "₹400", icon: "🚂" },
      { id: "bike-rental", name: "Bike Rental", price: "₹800/day", icon: "🏍️" },
      { id: "self-drive", name: "Self Drive", price: "₹2500", icon: "🚗" },
    ],
  },
  activities: {
    name: "Activities",
    options: [
      { id: "beach-trek", name: "Beach Trek", price: "Free", icon: "🥾" },
      { id: "temple-tour", name: "Temple Tour", price: "₹200", icon: "🛕" },
      { id: "yoga", name: "Yoga Session", price: "₹500", icon: "🧘" },
      { id: "kayaking", name: "Kayaking", price: "₹800", icon: "🛶" },
    ],
  },
  // Add more activities here easily
  // food: { name: "Food", options: [...] },
};

const TripPlanner = ({ planId }) => {
  const [activeTab, setActiveTab] = useState("stay");
  const [selections, setSelections] = useState({
    stay: null,
    transport: null,
    activities: [],
  });

  const updateSelection = (category, option) => {
    // console.log("Selecting:", category, option);
    
    if (category === "activities") {
      // ✅ Toggle: add if not selected, remove if selected
      setSelections((prev) => {
        const currentActivities = prev.activities || [];
        const isSelected = currentActivities.some((sel) => sel.id === option.id);
        
        let newActivities;
        if (isSelected) {
          newActivities = currentActivities.filter((sel) => sel.id !== option.id);
        } else {
          newActivities = [...currentActivities, option];
        }
        
        return {
          ...prev,
          activities: newActivities,
        };
      });
    } else {
      // Single select
      setSelections((prev) => ({
        ...prev,
        [category]: option,
      }));
    }
  };

  const nextStep = () => {
    console.log("Final plan:", selections);
  };

  const config = ACTIVITY_CONFIG;

  return (
    <div className="trip-planner">
      {/* Header */}
      <div className="activity-bar">
        {Object.keys(config).map((key) => (
          <button
            key={key}
            className={`activity-tab ${activeTab === key ? "active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {config[key].icon} {config[key].name}
          </button>
        ))}
      </div>

      {/* Middle */}
      <div className="selection-area">
        <div className="selection-header">
          <h2>{config[activeTab].name}</h2>
          <span className="selection-count">
            {activeTab === "activities"
              ? `${selections.activities?.length || 0}/4 selected`
              : selections[activeTab] ? "✓ Selected" : "Select one"}
          </span>
        </div>

        <div className="options-grid">
          {config[activeTab].options.map((option) => {
            // ✅ Fixed isSelected logic
            const isSelected =
              activeTab === "activities"
                ? selections.activities?.some((sel) => sel.id === option.id)
                : selections[activeTab]?.id === option.id;

            return (
              <div
                key={option.id}
                className={`option-card ${isSelected ? "selected" : ""}`}
                onClick={() => updateSelection(activeTab, option)}
              >
                <div className="option-icon">{option.icon}</div>
                <div className="option-details">
                  <h3>{option.name}</h3>
                  <span className="option-price">{option.price}</span>
                </div>
                {isSelected && <div className="selected-checkmark">✓</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="planner-footer">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${
                (Object.values(selections).filter(Boolean).length /
                  Object.keys(config).length) *
                100
              }%`,
            }}
          />
        </div>
        <button
          className="next-btn"
          onClick={nextStep}
          disabled={
            !selections.stay ||
            !selections.transport ||
            selections.activities.length === 0
          }
        >
          Next: Review Plan ({selections.activities?.length || 0}/4 activities)
        </button>
      </div>
    </div>
  );
};

export default TripPlanner;
