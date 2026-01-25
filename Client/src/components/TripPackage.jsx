import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
};

const TripPlanner = ({ planId }) => {
  const [activeTab, setActiveTab] = useState("stay");
  const [selections, setSelections] = useState({
    stay: null,
    transport: null,
    activities: [],
  });

  const navigate = useNavigate();

  const updateSelection = (category, option) => {
    if (category === "activities") {
      setSelections((prev) => {
        const currentActivities = prev.activities || [];
        const isSelected = currentActivities.some(
          (sel) => sel.id === option.id,
        );

        let newActivities;
        if (isSelected) {
          newActivities = currentActivities.filter(
            (sel) => sel.id !== option.id,
          );
        } else {
          newActivities = [...currentActivities, option];
        }

        return { ...prev, activities: newActivities };
      });
    } else {
      setSelections((prev) => ({
        ...prev,
        [category]: prev[category]?.id === option.id ? null : option,
      }));
    }
  };

  const nextStep = () => {
    const tabs = Object.keys(config);
    const currentIndex = tabs.indexOf(activeTab);

    // If we aren't on the last tab, just move to the next tab
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else {
      // If we ARE on the last tab, navigate to the next page
      navigate(`/plan-trip/${planId}/details`, {
        state: { selections },
      });
    }
  };

  const config = ACTIVITY_CONFIG;

  return (
    <div className="trip-planner">
      {/* ✅ STICKY TABS - Always visible */}
      <div className="sticky-tabs">
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
      </div>

      {/* ✅ SCROLLABLE CONTENT */}
      <div className="scrollable-content">
        {/* Middle */}
        <div className="selection-area">
          <div className="selection-header">
            <h2>{config[activeTab].name}</h2>
            <span className="selection-count">
              {activeTab === "activities"
                ? `${selections.activities?.length || 0}/4 selected`
                : selections[activeTab]
                  ? "✓ Selected"
                  : "Select one"}
            </span>
          </div>

          <div className="options-grid">
            {config[activeTab].options.map((option) => {
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
            disabled={activeTab !== "activities" && !selections[activeTab]} // Disable if current tab isn't filled
          >
            {activeTab === "activities" ? "Review Plan" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
