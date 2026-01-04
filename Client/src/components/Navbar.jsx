import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !event.target.closest("nav") &&
        !event.target.closest(".mobile-menu")
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const mobileLinks = [
    { to: "/stories", label: "Stories" },
    { to: "/experiences", label: "Experiences" },
    { to: "/contact", label: "Contact" },
    { to: "/beaches", label: "Beaches" },
    { to: "/temples", label: "Temples" },
    { to: "/about-us", label: "About" }
  ];

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 px-4 py-4 flex justify-between items-center">
      {/* Desktop: Logo + Links (UNCHANGED layout) */}
      <div className="flex flex-1 items-center justify-center hidden md:flex">
        <div className="flex space-x-6">
          <Link to="/stories" className="hover:text-indigo-300 font-medium">
            Stories
          </Link>
          <Link to="/experiences" className="hover:text-indigo-300 font-medium">
            Experiences
          </Link>
          <Link to="/contact" className="hover:text-indigo-300 font-medium">
            Contact
          </Link>
        </div>
      </div>

      <div className="flex flex-3 items-center justify-center hidden md:flex">
        <Link to="/" className="text-2xl font-bold text-sand-beige">
          🌊 Experience Gokarna
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center hidden md:flex">
        <div className="flex space-x-6">
          <Link to="/beaches" className="hover:text-indigo-300 font-medium">
            Beaches
          </Link>
          <Link to="/temples" className="hover:text-indigo-300 font-medium">
            Temples
          </Link>
          <Link to="/about-us" className="hover:text-indigo-300 font-medium">
            About
          </Link>
        </div>
      </div>

      {/* Mobile: Hamburger LEFT + Logo RIGHT (compact, dark theme) */}
      <div className="w-full flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className={`navbar-hamburger ${isOpen ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="hamburger-line line-1" />
          <span className="hamburger-line line-2" />
          <span className="hamburger-line line-3" />
        </button>

        <Link
          to="/"
          className="navbar-mobile-logo"
          onClick={closeMenu}
        >
          🌊 Experience Gokarna
        </Link>
      </div>

      {/* Mobile Menu (dark = navbar theme) */}
      {isOpen && isMobile && (
        <div className="mobile-menu">
          <button
            type="button"
            className="mobile-menu__backdrop"
            onClick={closeMenu}
            aria-label="Close menu"
          />

          <div className="mobile-menu__panel mobileMenuIn">
            <div className="mobile-menu__header">
              <span className="mobile-menu__title">Menu</span>
              <button
                type="button"
                className="mobile-menu__close"
                onClick={closeMenu}
              >
                Close
              </button>
            </div>

            <div className="mobile-menu__links">
              {mobileLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="mobile-menu__link"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mobile-menu__footer">
              “Let the waves reset you.”
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
