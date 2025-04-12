import React, { useState, useEffect } from "react";
import Navbar1 from "./components/navbar/navbar";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import { author } from "./firebaseconfig";
import GiftIdeas from "./components/giftideas/giftideas";
import Createwishlist from "./components/wishlists/createwishlist";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(author, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {/* Navbar always shows regardless of authentication */}
      <Navbar1 />
      <Dashboard/>
      
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wishlist" element={<Createwishlist />} />
       
        <Route path="/giftideas" element={<GiftIdeas />} />
        {/* <Route path="/" element={<Dashboard/>} /> */}
      </Routes>
    </div>
  );
};

export default App;