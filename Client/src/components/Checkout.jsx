import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// 1. IMPORT FIREBASE TOOLS
import { db } from "../firebase.config"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import "../styles/Checkout.css";

const TripDetailsForm = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get selections passed from previous page
  const selections = location.state?.selections || {
    stay: null,
    transport: null,
    activities: [],
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 2. THE SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step A: Save to Firestore
      // "leads" is the name of the collection in your Firebase console
      const docRef = await addDoc(collection(db, "leads"), {
        customerName: form.name,
        whatsapp: form.phone,
        email: form.email,
        planId: planId || "custom_plan",
        selections: {
          stay: selections.stay?.name || "None",
          transport: selections.transport?.name || "None",
          activities: selections.activities.map(a => a.name)
        },
        submittedAt: serverTimestamp(), // Records exact time of entry
        status: "pending"
      });

      console.log("Lead saved with ID: ", docRef.id);

      // Step B: Generate the PDF for the user
      generatePDF();

      // Step C: Move to a success screen or show a message
      alert("Success! Your itinerary is downloading and our team will contact you shortly.");
      navigate("/"); // Redirect home or to a thank you page

    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Connection failed. Check your internet or Firebase rules.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Gokarna Trip Summary", 14, 20);
    
    autoTable(doc, {
      startY: 30,
      head: [["Detail", "Value"]],
      body: [
        ["Name", form.name],
        ["Phone", form.phone],
        ["Stay", selections.stay?.name || "N/A"],
        ["Transport", selections.transport?.name || "N/A"],
        ["Activities", selections.activities.map(a => a.name).join(", ") || "None"]
      ],
      theme: 'grid',
      headStyles: { fillColor: [13, 148, 136] }
    });
    
    doc.save(`Trip_Plan_${form.name}.pdf`);
  };

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <header className="checkout-header">
          <h1>Final Step</h1>
          <p>Download your PDF and lock in your Gokarna plan.</p>
        </header>

        <section className="form-card-glass">
          <form onSubmit={handleSubmit} className="details-form">
            <div className="input-group">
              <label>Full Name</label>
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Enter your name" />
            </div>
            
            <div className="input-group">
              <label>WhatsApp Number</label>
              <input name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="e.g. 9876543210" />
            </div>

            <div className="input-group">
              <label>Email (Optional)</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
            </div>

            <div className="form-footer">
              <button type="button" className="btn-back" onClick={() => navigate(-1)}>Back</button>
              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Submit & Download"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default TripDetailsForm;