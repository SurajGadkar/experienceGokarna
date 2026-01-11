// src/pages/TripDetailsForm.jsx
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import the function directly
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

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(33, 37, 41); // Dark charcoal
    doc.text("Gokarna Trip Itinerary", 14, 22);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120);
    doc.text(
      `Booking Ref: GOK-${Math.floor(1000 + Math.random() * 9000)}`,
      14,
      28
    );
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, 28);

    doc.setDrawColor(220);
    doc.line(14, 32, 196, 32);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(41, 128, 185);
    doc.text("Traveler Details", 14, 45);

    const personalData = [
      ["Lead Traveler", form.name],
      ["WhatsApp/Phone", form.phone],
      ["Email Address", form.email],
      ["Home City", form.city || "N/A"],
      ["Group Size", `${form.travellers} Person(s)`],
      ["Budget Range", form.budget ? `INR ${form.budget}` : "TBD"],
    ];

    autoTable(doc, {
      startY: 50,
      head: [["Field", "Information"]],
      body: personalData,
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185], fontSize: 11 },
      styles: { cellPadding: 3, fontSize: 10 },
      margin: { left: 14, right: 14 },
    });

    const selectionsY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.text("Trip Customizations", 14, selectionsY);

    const selectionData = [
      [
        "Stay",
        selections.stay
          ? `${selections.stay.name} (${selections.stay.price})`
          : "Not selected",
      ],
      [
        "Transport",
        selections.transport ? selections.transport.name : "Not selected",
      ],
      [
        "Activities",
        selections.activities.length > 0
          ? selections.activities.map((a) => a.name).join(", ")
          : "No specific activities selected",
      ],
    ];

    autoTable(doc, {
      startY: selectionsY + 5,
      head: [["Category", "Preference"]],
      body: selectionData,
      theme: "grid",
      headStyles: { fillColor: [46, 204, 113], fontSize: 11 },
      styles: { cellPadding: 3, fontSize: 10 },
      columnStyles: { 0: { fontStyle: "bold", width: 40 } },
    });

    if (form.notes) {
      const notesY = doc.lastAutoTable.finalY + 15;
      doc.setFontSize(14);
      doc.text("Special Requirements", 14, notesY);

      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(80);

      const splitNotes = doc.splitTextToSize(form.notes, 180);
      doc.text(splitNotes, 14, notesY + 8);
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(
        "Thank you for choosing us to plan your Gokarna getaway!",
        105,
        285,
        { align: "center" }
      );
    }

    const fileName = `Gokarna_Trip_${form.name.replace(/\s+/g, "_")}.pdf`;
    doc.save(fileName);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      generatePDF();

      setTimeout(() => {
        const message =
          `*New Gokarna Lead*\n\n` +
          `* Name:* ${form.name}\n` +
          `* WhatsApp:* ${form.phone}\n` +
          `* Stay:* ${selections.stay?.name || "N/A"}\n` +
          `* Transport:* ${selections.transport?.name || "N/A"}\n` +
          `* Activities:* ${
            selections.activities.map((a) => a.name).join(", ") || "None"
          }\n` +
          `* Budget:* ₹${form.budget || "TBD"}\n` +
          `* Travelers:* ${form.travellers}\n\n`;

        const whatsappUrl = `https://wa.me/9742781642?text=${encodeURIComponent(
          message
        )}`;

        window.location.href = whatsappUrl;
      }, 4000);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="trip-details">
      <div className="trip-details__shell">
        <header className="trip-details__header">
          <h1 className="trip-details__title">Tell us a bit about you</h1>
          <p className="trip-details__subtitle">
            We’ll use this along with your selections to shape your Gokarna
            plan.
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
              <button type="submit" className="trip-form__submit">
                Submit details
              </button>
              <button
                type="button"
                className="trip-form__back"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default TripDetailsForm;
