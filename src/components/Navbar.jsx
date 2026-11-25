import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src="./images/logo.png" alt="Logo" className="logo" />
        <div className="company-name">Nepal Supermarket</div>
      </div>

      <div className="right-controls">
        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/location" onClick={() => setMenuOpen(false)}>Location</Link>

          {!user ? (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          ) : (
            <>
              <span className="nav-user">Hi, {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>

        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
