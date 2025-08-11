import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { TbLogout } from "react-icons/tb";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout, login } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && !isLoggedIn) {
      try {
        login(JSON.parse(savedUser));
      } catch (err) {
        console.error("Error restoring user:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">Refer & Earn</div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/redeem" onClick={() => setMenuOpen(false)}>Redeem</Link>
            <button className="logout-btn" onClick={handleLogout}>
              <TbLogout />
            </button>
          </>
        ) : (
          <>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Signup</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
