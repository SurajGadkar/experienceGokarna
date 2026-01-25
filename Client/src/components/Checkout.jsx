import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "", // Optional
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // PDF Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(13, 148, 136); // Teal main color
    doc.text("Gokarna Trip Itinerary", 14, 22);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(`Booking Ref: GOK-${planId?.toUpperCase() || "PLAN"}-${Math.floor(1000 + Math.random() * 9000)}`, 14, 28);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, 28);

    // 1. Contact Details Table
    const contactData = [
      ["Lead Traveler", form.name],
      ["WhatsApp No", form.phone],
      ["Email Address", form.email || "Not Provided"],
    ];

    autoTable(doc, {
      startY: 35,
      head: [["Field", "Details"]],
      body: contactData,
      theme: "striped",
      headStyles: { fillColor: [13, 148, 136] },
    });

    // 2. Selection Table
    const selectionData = [
      ["Stay", selections.stay ? `${selections.stay.name} (INR ${selections.stay.price})` : "N/A"],
      ["Transport", selections.transport ? selections.transport.name : "N/A"],
      ["Activities", selections.activities.length > 0 ? selections.activities.map(a => a.name).join(", ") : "None"]
    ];

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Category", "Your Selections"]],
      body: selectionData,
      theme: "grid",
      headStyles: { fillColor: [30, 41, 59] },
    });

    doc.save(`Gokarna_Plan_${form.name.replace(/\s+/g, "_")}.pdf`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();

    // WhatsApp Message
    const message =
      `*New Gokarna Lead*\n\n` +
      `*Name:* ${form.name}\n` +
      `*WhatsApp:* ${form.phone}\n` +
      `*Email:* ${form.email || "N/A"}\n\n` +
      `*Selected Plan:*\n` +
      `- Stay: ${selections.stay?.name || "N/A"}\n` +
      `- Transport: ${selections.transport?.name || "N/A"}\n` +
      `- Activities: ${selections.activities.map(a => a.name).join(", ") || "None"}`;

    const whatsappUrl = `https://wa.me/9742781642?text=${encodeURIComponent(message)}`;
    
    setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 1500);
  };

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <header className="checkout-header">
          <h1>Finalize Your Plan</h1>
          <p>Provide your contact details to download your itinerary.</p>
        </header>

        {/* Mini Summary */}
        <div className="selection-summary-glass">
          <div className="summary-chip">🏠 {selections.stay?.name || "Stay"}</div>
          <div className="summary-chip">🚌 {selections.transport?.name || "Transport"}</div>
          <div className="summary-chip">🥾 {selections.activities.length} Activities</div>
        </div>

        <section className="form-card-glass">
          <form onSubmit={handleSubmit} className="details-form">
            <div className="input-group">
              <label>Full Name *</label>
              <input 
                name="name" 
                required 
                value={form.name} 
                onChange={handleChange} 
                placeholder="How should we call you?" 
              />
            </div>

            <div className="input-group">
              <label>WhatsApp Number *</label>
              <input 
                name="phone" 
                type="tel"
                required 
                value={form.phone} 
                onChange={handleChange} 
                placeholder="+91 00000 00000" 
              />
            </div>

            <div className="input-group">
              <label>Email Address (Optional)</label>
              <input 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={handleChange} 
                placeholder="For itinerary backup" 
              />
            </div>

            <div className="form-footer">
              <button type="button" className="btn-back" onClick={() => navigate(-1)}>
                Back
              </button>
              <button type="submit" className="btn-submit">
                Get PDF & Confirm
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default TripDetailsForm;