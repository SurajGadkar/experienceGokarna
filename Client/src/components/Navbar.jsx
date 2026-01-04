import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Handle click outside to close menu
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest("nav")) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg px-4 py-4 flex justify-between items-center">
      {/* Desktop: Logo + Links */}
      <div className="flex flex-1 items-center justify-center hidden md:flex ">
        <div className="flex  space-x-6">
          <Link to="/beaches" className="hover:text-indigo-600 font-medium">
            Stories
          </Link>
          <Link to="/temples" className="hover:text-indigo-600 font-medium">
            Experiences
          </Link>
          <Link to="/contact" className="hover:text-indigo-600 font-medium">
            Contact
          </Link>  
        </div>
      </div>

      <div className="flex flex-3 items-center justify-center hidden md:flex ">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          🌊 Experience Gokarna
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center hidden md:flex  ">
        <div className="flex space-x-6">
          <Link to="/beaches" className="hover:text-indigo-600 font-medium">
            Beaches
          </Link>
          <Link to="/temples" className="hover:text-indigo-600 font-medium">
            Temples
          </Link>
          <Link to="/about-us" className="hover:text-indigo-600 font-medium">
            About
          </Link>
        </div>
      </div>

      {/* Mobile: Logo + Hamburger */}
      <div className="flex items-center justify-between md:hidden">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          🌊 Gokarna
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="space-y-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-indigo-600 transition-transform ${
              isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-indigo-600 transition-opacity ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-indigo-600 transition-transform ${
              isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"
            }`}
          />
        </button>
      </div>

      {/* Mobile Full-Screen Menu */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 bg-gradient-to-b from-white/95 to-indigo-100 md:hidden animate-slideDown z-40 flex flex-col items-center justify-center space-y-8 pt-20">
          <Link
            to="/beaches"
            className="text-3xl font-bold hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Beaches
          </Link>
          <Link
            to="/temples"
            className="text-3xl font-bold hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            Temples
          </Link>
          <Link
            to="/about-us"
            className="text-3xl font-bold hover:text-indigo-600"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

