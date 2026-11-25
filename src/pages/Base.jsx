import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Base.css";
const BaseLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Main content */}
      <main className="main-content">
        {children}
      </main>

      {/* Full Footer */}
      <footer className="footer">
        <div className="footer-container">
          {/* Logo */}
          <div className="footer-logo">
            <img src="./images/logo.png" alt="Logo" className="logo" />
            <div className="company-name">Nepal Supermarket</div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/cart">Cart</a>
            <a href="/contact">Contact</a>
            <a href="/location">Location</a>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: info@nepalsupermarket.com</p>
            <p>Phone: +977-9800000000</p>
            <p>Address: Kathmandu, Nepal</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Nepal Supermarket. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BaseLayout;
