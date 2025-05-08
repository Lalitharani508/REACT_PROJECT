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
import FooterAlt from "./components/Footer/Footer";
import Navbar1 from "./components/navbar/navbar";
import LandingPage from "./components/navbar/Landingpage";

// ✅ Protected Route Component
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(author, (currentUser) => {
      localStorage.setItem("user", JSON.stringify(currentUser));
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Show Navbar only on public routes if not logged in
  const publicPaths = ["/", "/login", "/signup"];
  const showNavbar = publicPaths.includes(location.pathname) && !user;

  // Optional loading state UI
  // if (loading) return <div>Loading...</div>;

  return (
    <div>
      {showNavbar && <Navbar1 />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
              <Createwishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
              <Createwishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/giftideas"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
              <GiftIdeas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Optional: Add <FooterAlt /> if needed */}
    </div>
  );
};

export default App;
