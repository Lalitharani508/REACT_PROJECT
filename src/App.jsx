import React, { useState, useEffect } from "react";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import { author } from "./firebaseconfig";
import GiftIdeas from "./components/giftideas/giftideas";
import Createwishlist from "./components/wishlists/createwishlist";
import { Navigate } from "react-router-dom";
import Settings from "./components/settings/Settings";
import FooterAlt from "./components/Footer/Footer";
import Navbar1 from "./components/navbar/navbar";
const App = () => {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const userloggedin= onAuthStateChanged(author, (currentUser) => {
      setUser(currentUser);
      
    });
    return () => userloggedin();
  }, []);

  

  return (
    <div>
      {/* Navbar always shows regardless of authentication */}
      <Navbar1/>
       <Dashboard/>
      
      <Routes>
        <Route path="/" element={<Navbar1 />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={user ?<Createwishlist />:<Navigate to="./login"/>} />
        <Route path="/wishlist" element={<Createwishlist />} />
       
        <Route path="/giftideas" element={<GiftIdeas />} />
        <Route path="/settings" element={<Settings/>}></Route>
        
      </Routes>
      {/* <FooterAlt/>  */}

    </div>
  );
};

export default App;