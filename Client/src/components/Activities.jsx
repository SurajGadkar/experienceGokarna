import React, { useMemo, useState } from "react";
import "../styles/Activites.css";
import { activities } from "../data/data";

const Activities = () => {
  const data = activities?.gokarna;

  const categories = useMemo(
    () => [
      { id: "beaches", label: "Beaches" },
      { id: "temples", label: "Temples" },
      { id: "trekking", label: "Trekking" },
      { id: "adventures", label: "Adventures" },
      { id: "other_attractions", label: "Others" }
    ],
    []
  );

  const defaultCategory = useMemo(() => {
    const places = data?.places || {};
    const first = categories.find(
      (c) => Array.isArray(places[c.id]) && places[c.id].length > 0
    );
    return first?.id || "beaches";
  }, [data, categories]);

  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  if (!data) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-sand-beige text-lg">Activities data not found.</p>
      </div>
    );
  }

  const places = data?.places?.[activeCategory] || [];

  const renderPlaceCard = (place, index) => (
    <article
      key={`${activeCategory}-${place?.name || index}`}
      className={`activity-card animate-slideDown stagger-${(index % 3) + 1}`}
    >
      <header className="activity-card__header">
        <h3 className="activity-card__title">{place.name}</h3>
        <p className="activity-card__desc">{place.description}</p>
      </header>

      {Array.isArray(place.activities) && place.activities.length > 0 && (
        <ul className="activity-card__list">
          {place.activities.map((activity, i) => (
            <li key={`${place.name}-activity-${i}`} className="activity-card__listItem">
              <span className="activity-card__dot" />
              <span>{activity}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="activity-card__meta">
        {place.timings && <span className="chip chip--emerald">⏰ {place.timings}</span>}
        {place.difficulty && <span className="chip chip--orange">⚡ {place.difficulty}</span>}
        {place.location && <span className="chip chip--sky">📍 {place.location}</span>}
        {place.access && <span className="chip chip--sky">📍 {place.access}</span>}
        {place.best_time && <span className="chip chip--neutral">🗓️ {place.best_time}</span>}
        {place.cost_estimate && <span className="chip chip--money">💰 {place.cost_estimate}</span>}
      </div>
    </article>
  );

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="hero-container h-[70vh] sm:h-[80vh] lg:h-screen flex items-center justify-center text-center mb-10 sm:mb-14 lg:mb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-hero mb-5 sm:mb-8 drop-shadow-2xl">
            Explore Gokarna
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl text-sand-beige/90 max-w-3xl mx-auto leading-relaxed drop-shadow-xl animate-slideDown">
            {data.introduction}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 lg:pb-24">
        {/* Tabs */}
        <div className="tabs-shell">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`tab-btn ${activeCategory === cat.id ? "is-active" : ""}`}
              type="button"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid (mobile friendly) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-10 sm:mb-14 lg:mb-20">
          {places.map(renderPlaceCard)}
        </div>

        {/* Tips */}
        <section className="glass-card p-6 sm:p-10 lg:p-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gradient text-center mb-8 sm:mb-10 lg:mb-12 drop-shadow-2xl">
            Travel Tips
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { title: "Best Season", content: data.tips?.best_season },
              { title: "Transport", content: data.tips?.transport },
              { title: "Notes", content: data.tips?.notes }
            ].map((tip, i) => (
              <div key={i} className="tip-card">
                <h3 className="tip-card__title">{tip.title}</h3>
                <p className="tip-card__text">{tip.content || "-"}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Activities;
