import { Routes, Route, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Beaches from "./components/Beaches.jsx";
import Temples from "./components/Temples.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Activities from "./components/Activities.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/beaches" element={<Beaches />} />
          <Route path="/temples" element={<Temples />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/activities" element={<Activities />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
