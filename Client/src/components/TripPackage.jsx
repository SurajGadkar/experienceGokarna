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
      { id: "surfing", name: "Surfing", price: "1200", icon: "🏄" },
    ],
  },
};

const theme = createTheme({
  palette: { primary: { main: "#0d9488" } },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          height: "42px",
          fontSize: "0.85rem",
          "& fieldset": { border: "none" },
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
        state: { selections, travelDate: travelDate?.format("YYYY-MM-DD"), planId },
      });
    }
  };

  const currentCategory = ACTIVITY_CONFIG[activeTab];

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="trip-planner">
          {/* ✅ Horizontally Scrollable Header Bar */}
          <div className="tab-scroll-container">
            <div className="activity-bar">
              <button
                className={`activity-tab ${activeTab === "stay" ? "active" : ""}`}
                onClick={() => setActiveTab("stay")}
              >
                <span>🏠</span><span>Stay</span>
              </button>

              <div className="inline-date-picker">
                <DatePicker
                  value={travelDate}
                  onChange={(val) => setTravelDate(val)}
                  disablePast
                  slotProps={{ textField: { size: "small", placeholder: "Date" } }}
                />
              </div>

              <button
                className={`activity-tab ${activeTab === "transport" ? "active" : ""}`}
                onClick={() => setActiveTab("transport")}
              >
                <span>🚌</span><span>Transport</span>
              </button>

              <button
                className={`activity-tab ${activeTab === "activities" ? "active" : ""}`}
                onClick={() => setActiveTab("activities")}
              >
                <span>🥾</span><span>Activities</span>
              </button>
            </div>
          </div>

          {/* Main Selection Card */}
          <div className="scrollable-content">
            <header className="selection-header">
              <h2>{currentCategory.name}</h2>
              <span className="selection-count">
                {activeTab === "activities" 
                  ? `${selections.activities.length}` 
                  : selections[activeTab] ? "✓" : "!"}
              </span>
            </header>

            <div className="options-scroll-box">
              <div className="options-grid">
                {currentCategory.options.map((option) => {
                  const isSelected = activeTab === "activities"
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
          </div>

          <footer className="planner-footer">
            <button
              className="next-btn"
              onClick={nextStep}
              disabled={!travelDate || (activeTab !== "activities" && !selections[activeTab])}
            >
              {activeTab === "activities" ? "Review Plan" : "Next"}
            </button>
          </footer>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}