import React, { useState } from "react";
import { signOut } from 'firebase/auth';
import { author } from "../../firebaseconfig";
import { useNavigate, Link } from "react-router-dom";
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  
  const logout = async () => {
    try {
      await signOut(author);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="dashboard-container">
      {/* Top header bar - now minimal */}
      <header className="dashboard-header">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <i className="menu-icon">☰</i>
        </button>
      </header>

      {/* Left sidebar navigation with title at top */}
      <div className={`sidebar ${showSidebar ? 'active' : ''}`}>
        <div className="sidebar-title">
          <h3>Lalitha's Wishlist</h3>
          <button className="close-sidebar" onClick={toggleSidebar}>×</button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/" onClick={toggleSidebar}>Wishlist</Link>
            </li>
            <li>
              <Link to="/giftideas" onClick={toggleSidebar}>Gift Ideas</Link>
            </li>
            <li>
              <Link to="/share" onClick={toggleSidebar}>Share</Link>
            </li>
            <li>
              <Link to="/settings" onClick={toggleSidebar}>Settings</Link>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main content area */}
      <main className="dashboard-content">
        <h2>Your Wishlists</h2>
        <div className="wishlist-cards">
          <div className="wishlist-card">
            <h3>Birthday Wishlist</h3>
            <p>Items: 5</p>
            <button className="view-btn">View</button>
          </div>
          <div className="wishlist-card">
            <h3>Holiday Wishlist</h3>
            <p>Items: 3</p>
            <button className="view-btn">View</button>
          </div>
          <div className="wishlist-card add-new">
            <h3>Create New Wishlist</h3>
            <button className="add-btn">+</button>
          </div>
        </div>
      </main>
      
      {/* Overlay for mobile sidebar */}
      {showSidebar && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Dashboard;