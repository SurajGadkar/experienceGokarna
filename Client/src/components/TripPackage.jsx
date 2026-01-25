import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import "../styles/TripPlanner.css";

const ACTIVITY_CONFIG = {
  stay: {
    name: "Stay",
    icon: "🏠",
    options: [
      { id: "hostel", name: "Hostel", price: "800", icon: "🏠" },
      { id: "beach-hut", name: "Beach Hut", price: "1500", icon: "🌴" },
      { id: "resort", name: "Resort", price: "3500", icon: "🏖️" },
      { id: "homestay", name: "Homestay", price: "1200", icon: "🏡" },
    ],
  },
  transport: {
    name: "Transport",
    icon: "🚌",
    options: [
      { id: "bus", name: "Bus", price: "600", icon: "🚌" },
      { id: "train", name: "Train", price: "400", icon: "🚂" },
      { id: "bike-rental", name: "Bike Rental", price: "800", icon: "🏍️" },
      { id: "self-drive", name: "Self Drive", price: "2500", icon: "🚗" },
    ],
  },
  activities: {
    name: "Activities",
    icon: "🥾",
    options: [
      { id: "beach-trek", name: "Beach Trek", price: "0", icon: "🥾" },
      { id: "temple-tour", name: "Temple Tour", price: "200", icon: "🛕" },
      { id: "yoga", name: "Yoga Session", price: "500", icon: "🧘" },
      { id: "kayaking", name: "Kayaking", price: "800", icon: "🛶" },
    ],
  },
};

// Custom MUI Theme to match your Teal/Crystal UI
const theme = createTheme({
  palette: {
    primary: { main: "#0d9488" },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "14px",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
          },
        },
      },
    },
  },
});

export default function TripPlanner() {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("stay");
  const [travelDate, setTravelDate] = useState(null);
  const [selections, setSelections] = useState({
    stay: null,
    transport: null,
    activities: [],
  });

  const updateSelection = (category, option) => {
    if (category === "activities") {
      setSelections((prev) => {
        const isSelected = prev.activities.some((sel) => sel.id === option.id);
        return {
          ...prev,
          activities: isSelected
            ? prev.activities.filter((sel) => sel.id !== option.id)
            : [...prev.activities, option],
        };
      });
    } else {
      setSelections((prev) => ({
        ...prev,
        [category]: prev[category]?.id === option.id ? null : option,
      }));
    }
  };

  const nextStep = () => {
    const tabs = Object.keys(ACTIVITY_CONFIG);
    const currentIndex = tabs.indexOf(activeTab);

    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else {
      navigate(`/plan-trip/${planId}/details`, {
        state: { 
          selections, 
          travelDate: travelDate ? travelDate.format("YYYY-MM-DD") : null, 
          planId 
        },
      });
    }
  };

  const currentCategory = ACTIVITY_CONFIG[activeTab];

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="trip-planner">
          {/* 1. Sticky Tabs Bar */}
          <div className="sticky-tabs">
            <div className="activity-bar ">
              {Object.entries(ACTIVITY_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  className={`activity-tab ${activeTab === key ? "active" : ""}`}
                  onClick={() => setActiveTab(key)}
                >
                  <span>{config.icon}</span>
                  <span>{config.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ✅ MUI Date Picker Integrated between Header and Grid */}
              <div className="date-picker-container-mui">
                <div className="date-picker-label">
                  <span className="calendar-emoji">📅</span>
                  <label>Select Trip Date</label>
                </div>
                <DatePicker
                  value={travelDate}
                  onChange={(newValue) => setTravelDate(newValue)}
                  disablePast
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      placeholder: "Pick a date",
                    },
                  }}
                />
              </div>

          {/* 2. Main Glass Content Area */}
          <div className="scrollable-content">
            <div className="selection-area">
              <header className="selection-header">
                <h2>{currentCategory.name}</h2>
                <span className="selection-count">
                  {activeTab === "activities" 
                    ? `${selections.activities.length} selected` 
                    : selections[activeTab] ? "Selected ✓" : "Required"}
                </span>
              </header>

              

              {/* 3. Options Grid */}
              <div className="options-grid">
                {currentCategory.options.map((option) => {
                  const isSelected =
                    activeTab === "activities"
                      ? selections.activities.some((sel) => sel.id === option.id)
                      : selections[activeTab]?.id === option.id;

                  return (
                    <div
                      key={option.id}
                      className={`option-card ${isSelected ? "selected" : ""}`}
                      onClick={() => updateSelection(activeTab, option)}
                    >
                      <div className="option-icon">{option.icon}</div>
                      <div className="option-info">
                        <h3>{option.name}</h3>
                        <span className="option-price">₹{option.price}</span>
                      </div>
                      {isSelected && <div className="selected-checkmark">✓</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Footer with Progress and Next Button */}
            <footer className="planner-footer">
              <div className="progress-container">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((Object.keys(ACTIVITY_CONFIG).indexOf(activeTab) + 1) / 3) * 100}%` }}
                />
              </div>
              <button
                className="next-btn"
                onClick={nextStep}
                disabled={!travelDate || (activeTab !== "activities" && !selections[activeTab])}
              >
                {!travelDate ? "Pick a Travel Date" : activeTab === "activities" ? "Review Final Plan" : "Next Step"}
              </button>
            </footer>
          </div>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}