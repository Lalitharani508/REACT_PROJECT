import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { author } from "./firebaseconfig";

// Components
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Dashboard from "./components/dashboard/dashboard";
import GiftIdeas from "./components/giftideas/giftideas";
import Createwishlist from "./components/wishlists/createwishlist";
import Settings from "./components/settings/Settings";
import Navbar1 from "./components/navbar/navbar";
import LandingPage from "./components/navbar/Landingpage";

// Protected Route Component with redirect handling
const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();
  
  if (!user) {
    // Redirect to login and store the attempted URL to redirect back after login
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }
  
  return children;
};

// Layout Component for Dashboard pages
const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Dashboard />
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(author, (currentUser) => {
      // Update user state
      setUser(currentUser);
      
      // Store in localStorage (if needed)
      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
        
        // Redirect to dashboard if on public route
        const publicPaths = ["/", "/login", "/signup"];
        if (publicPaths.includes(location.pathname)) {
          // Check if there's a saved redirect location
          const intendedDestination = location.state?.from || "/dashboard";
          navigate(intendedDestination, { replace: true });
        }
      } else {
        localStorage.removeItem("user");
        
        // If on protected route, will redirect via ProtectedRoute component
      }
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [navigate, location.pathname]);

  // Determine whether to show navbar
  const publicPaths = ["/", "/login", "/signup"];
  const showNavbar = publicPaths.includes(location.pathname);

  // Loading state
  // if (loading) {
  //   return <div className="loading">Loading...</div>;
  // }

  return (
    <div>
      {showNavbar && <Navbar1 />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout>
                <Createwishlist />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout>
                <Createwishlist />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/giftideas"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout>
                <GiftIdeas />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;