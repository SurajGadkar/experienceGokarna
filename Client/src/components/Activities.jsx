import React, { useState } from 'react';
import '../styles/Activities.css'; // Import the CSS
import gokarnaData from './gokarna-data.json';

const Activities = () => {
  const [activeCategory, setActiveCategory] = useState('beaches');
  const categories = [
    { id: 'beaches', label: 'Beaches' },
    { id: 'temples', label: 'Temples' },
    { id: 'trekking', label: 'Trekking' },
    { id: 'adventures', label: 'Adventures' },
    { id: 'other_attractions', label: 'Others' }
  ];

  const renderPlaceCard = (place, index) => (
    <div key={index} className={`activity-card p-8 rounded-3xl animate-slideDown stagger-${(index % 3) + 1}`}>
      <h3 className="text-2xl font-black text-ocean-navy mb-4">{place.name}</h3>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">{place.description}</p>
      
      {place.activities && (
        <ul className="mb-6 space-y-3">
          {place.activities.map((activity, i) => (
            <li key={i} className="flex items-center text-turquoise-sea font-semibold">
              <span className="w-3 h-3 bg-gradient-to-r from-turquoise-sea to-blue-500 rounded-full mr-3 shadow-sm"></span>
              {activity}
            </li>
          ))}
        </ul>
      )}
      
      <div className="space-y-2 text-sm">
        {place.timings && <p className="text-emerald-600 font-bold bg-emerald-100 px-4 py-2 rounded-full inline-block">⏰ {place.timings}</p>}
        {place.access && <p className="text-sky-600 font-medium">📍 {place.access}</p>}
        {place.difficulty && <p className="text-orange-600 font-bold bg-orange-100 px-4 py-2 rounded-full inline-block">⚡ {place.difficulty}</p>}
        {place.cost_estimate && <p className="text-xl font-black text-gradient bg-gradient-to-r from-sand-beige/80 px-6 py-3 rounded-2xl shadow-lg inline-block">💰 {place.cost_estimate}</p>}
      </div>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero - Exact match */}
      <div className="hero-container h-screen flex items-center justify-center text-center mb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl font-black text-hero mb-8 drop-shadow-2xl">Explore Gokarna</h1>
          <p className="text-2xl text-sand-beige/95 max-w-3xl mx-auto leading-relaxed drop-shadow-xl animate-slideDown">
            {gokarnaData.gokarna.introduction}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-2xl">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`btn-primary text-lg px-10 py-5 rounded-3xl shadow-xl ${activeCategory === cat.id ? 'active ring-4 ring-turquoise-sea/30 shadow-hero' : 'hover:shadow-hero'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
          {gokarnaData.gokarna.places[activeCategory]?.map(renderPlaceCard)}
        </div>

        {/* Tips */}
        <div className="tips-backdrop rounded-3xl p-16 shadow-2xl backdrop-blur-xl">
          <h2 className="text-5xl font-black text-gradient text-center mb-16 drop-shadow-2xl">Travel Tips</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Best Season', content: gokarnaData.gokarna.tips.best_season },
              { title: 'Transport', content: gokarnaData.gokarna.tips.transport },
              { title: 'Notes', content: gokarnaData.gokarna.tips.notes }
            ].map((tip, i) => (
              <div key={i} className="p-10 bg-white/70 rounded-3xl shadow-xl hover:shadow-hero transition-all duration-500 backdrop-blur-md border border-sand-beige/30">
                <h3 className="text-3xl font-bold text-ocean-navy mb-6">{tip.title}</h3>
                <p className="text-2xl text-turquoise-sea font-semibold leading-relaxed">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
