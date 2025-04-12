import React, { useState } from "react";
import { signOut } from 'firebase/auth';
import { author } from "../../firebaseconfig";
import { useNavigate, Link } from "react-router-dom";
import './dashboard.css';

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const logout = async () => {
    try {
      await signOut(author);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Toggle dropdown menu for mobile view
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="header-container">
      {/* Main header bar */}
      <header className="main-header">
        <div className="header-left">
          <h2 className="site-title">Lalitha's Wishlist</h2>
        </div>
        
        {/* Desktop navigation */}
        <nav className="desktop-nav">
          <ul>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="/giftideas">Gift Ideas</Link>
            </li>
            <li>
              <Link to="/share">Share</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        
        <div className="header-right">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
          
          {/* Mobile menu button */}
          <button className="menu-toggle" onClick={toggleDropdown}>
            <i className="menu-icon">☰</i>
          </button>
        </div>
      </header>

      {/* Mobile dropdown navigation */}
      {showDropdown && (
        <div className="mobile-dropdown">
          <nav className="mobile-nav">
            <ul>
              <li>
                <Link to="/" onClick={toggleDropdown}>Wishlist</Link>
              </li>
              <li>
                <Link to="/giftideas" onClick={toggleDropdown}>Gift Ideas</Link>
              </li>
              <li>
                <Link to="/share" onClick={toggleDropdown}>Share</Link>
              </li>
              <li>
                <Link to="/settings" onClick={toggleDropdown}>Settings</Link>
              </li>
              <li className="mobile-logout">
                <button onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
      
      {/* Overlay for mobile dropdown */}
      {showDropdown && <div className="dropdown-overlay" onClick={toggleDropdown}></div>}
    </div>
  );
};

export default Header;