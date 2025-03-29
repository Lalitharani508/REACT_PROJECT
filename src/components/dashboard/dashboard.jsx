import React from "react";
// import {signOut} from 'firebase/auth'
import { author } from "../../firebaseconfig";
import { useNavigate} from "react-router-dom"
import './dashboard.css'
const Dashboard=()=>{
    // const navigate=useNavigate()
    // const logout=async()=>{
    //     await signOut(author)
    //     alert("loggedout successfully")
    //     navigate("/login")

    // }
    
    return(
        <header className="header">
        <h1>Lalitha's Wishlist</h1>
        <nav>
          <ul>
            <li>
              <a href="/">Wishlilst</a>
            </li>
            <li>
              <a href="/giftideas">Gift Ideas</a>
            </li>
            <li>
              <a href="/contact">Share</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
          </ul>
        </nav>
      </header>
    )
}
export default Dashboard;



// import React from "react";
// import { author } from "../../firebaseconfig";

