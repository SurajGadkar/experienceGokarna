// src/pages/TripDetailsForm.jsx
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/Checkout.css";

const TripDetailsForm = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selections = location.state?.selections || {
    stay: null,
    transport: null,
    activities: [],
  };

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    travellers: 2,
    budget: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  const message = `*New Gokarna Lead*\n\n` +
    `* Name:* ${form.name}\n` +
    `* WhatsApp:* ${form.phone}\n` +
    `* Stay:* ${selections.stay?.name || 'N/A'} (${selections.stay?.price || ''})\n` +
    `* Transport:* ${selections.transport?.name || 'N/A'}\n` +
    `* Activities:* ${selections.activities.map(a => a.name).join(', ') || 'None'}\n` +
    `* Budget:* ₹${form.budget || 'TBD'}\n` +
    `* Travelers:* ${form.travellers}\n\n` +
    `* Ready to customize their Gokarna trip!* 📞`;

  const whatsappUrl = `https://wa.me/9742781642?text=${encodeURIComponent(message)}`;
  
  // Opens WhatsApp chat instantly
  window.open(whatsappUrl, '_blank');
  
  alert("✅ Message sent to WhatsApp! Check your WhatsApp now.");
};

  return (
    <main className="trip-details">
      <div className="trip-details__shell">
        <header className="trip-details__header">
          <h1 className="trip-details__title">
            Tell us a bit about you
          </h1>
          <p className="trip-details__subtitle">
            We’ll use this along with your selections to shape your Gokarna plan.
          </p>
        </header>

        {/* Summary of previous selections */}
        <section className="trip-summary">
          <h2 className="trip-summary__title">Your selections</h2>
          <div className="trip-summary__grid">
            <div className="trip-summary__card">
              <h3>Stay</h3>
              <p>
                {selections.stay
                  ? `${selections.stay.icon} ${selections.stay.name} (${selections.stay.price})`
                  : "Not selected"}
              </p>
            </div>
            <div className="trip-summary__card">
              <h3>Transport</h3>
              <p>
                {selections.transport
                  ? `${selections.transport.icon} ${selections.transport.name} (${selections.transport.price})`
                  : "Not selected"}
              </p>
            </div>
            <div className="trip-summary__card">
              <h3>Activities</h3>
              <p>
                {selections.activities && selections.activities.length > 0
                  ? selections.activities
                      .map((a) => `${a.icon} ${a.name}`)
                      .join(" • ")
                  : "Not selected"}
              </p>
            </div>
          </div>
        </section>

        {/* Details form */}
        <section className="trip-form">
          <form onSubmit={handleSubmit} className="trip-form__grid">
            <div className="trip-form__field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="trip-form__field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="trip-form__field">
              <label htmlFor="phone">WhatsApp / Phone</label>
              <input
                id="phone"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="trip-form__field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </div>

            <div className="trip-form__field">
              <label htmlFor="travellers">Travellers</label>
              <input
                id="travellers"
                name="travellers"
                type="number"
                min="1"
                value={form.travellers}
                onChange={handleChange}
              />
            </div>

            <div className="trip-form__field">
              <label htmlFor="budget">Approx budget (per person)</label>
              <input
                id="budget"
                name="budget"
                placeholder="e.g. ₹3000 – ₹6000"
                value={form.budget}
                onChange={handleChange}
              />
            </div>

            <div className="trip-form__field trip-form__field--full">
              <label htmlFor="notes">Anything else?</label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="Dates, preferences, must-visit places, etc."
                value={form.notes}
                onChange={handleChange}
              />
            </div>

            <div className="trip-form__actions">
              <button
                type="button"
                className="trip-form__back"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
              <button type="submit" className="trip-form__submit">
                Submit details
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default TripDetailsForm;
